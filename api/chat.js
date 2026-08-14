import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { createClient } from '@sanity/client';

// Configure the Groq provider
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// Configure Sanity Client
const sanity = createClient({
  projectId: 'wzn5s2a9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-02-18',
});

// Set the runtime to edge for best performance
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { messages } = await req.json();

  // Fetch packages from Sanity to provide context
  let packages = [];
  try {
    packages = await sanity.fetch('*[_type == "package"]{title, shortDescription, priceInfo}');
  } catch (error) {
    console.error('Failed to fetch packages:', error);
  }

  const packageContext = packages.map(p => 
    `- ${p.title}: ${p.shortDescription} (${p.priceInfo || 'Consultar precio'})`
  ).join('\n');

  const systemPrompt = `Eres un experto agente de viajes de la agencia "SaltySoulTrips".
Tu misión es ayudar a los clientes a encontrar su viaje ideal y convencerlos de que nos pidan un presupuesto.
Aquí tienes los paquetes de viaje que ofrecemos actualmente:
${packageContext}

Reglas:
1. Responde preguntas sobre nuestros destinos basándote en los paquetes anteriores.
2. Si te preguntan por un destino que no ofrecemos, dile amablemente que somos especialistas en otros destinos, y ofrécele uno similar de nuestra lista.
3. Puedes responder dudas generales de viajes (como "¿necesito pasaporte?", "¿cuál es el mejor seguro?", o el clima) para aportar valor, siempre manteniendo un tono amable, profesional y aventurero.
4. Sé conciso y no escribas respuestas excesivamente largas. Usa emojis de viajes.
5. Nunca menciones que eres una IA o que usas una base de datos. Finge ser un humano experto del equipo de SaltySoulTrips.
6. Tu única función es proporcionar información. BAJO NINGÚN CONCEPTO debes hacer contratos, cerrar ventas directamente ni realizar reservas. Si un cliente quiere hacer un viaje o reservar, indícale siempre que debe ir al apartado de contacto de la web o dale el número de teléfono de SaltySoulTrips para que hable directamente con nosotros.`;

  try {
    const result = streamText({
      model: groq('llama-3.1-8b-instant'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('AI Stream Error:', error);
    return new Response('Error interno', { status: 500 });
  }
}
