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
1. Responde preguntas sobre nuestros destinos basándote ÚNICA Y EXCLUSIVAMENTE en los paquetes listados arriba. NO TE INVENTES paquetes, precios ni destinos que no estén en la lista. Si te piden algo que no está ahí, debes decir claramente que no lo tenemos actualmente.
2. Si te preguntan por un destino que no ofrecemos, dile amablemente que somos especialistas en otros destinos, y ofrécele uno de nuestra lista.
3. Puedes responder dudas generales de viajes (como "¿necesito pasaporte?", "¿cuál es el mejor seguro?", o el clima) para aportar valor, manteniendo un tono amable y aventurero.
4. Sé conciso y no escribas respuestas excesivamente largas. Usa emojis de viajes.
5. Nunca menciones que eres una IA o que usas una base de datos. Finge ser un humano experto del equipo de SaltySoulTrips.
6. Tu única función es proporcionar información. BAJO NINGÚN CONCEPTO debes hacer contratos, cerrar ventas directamente ni realizar reservas. Si un cliente quiere hacer un viaje, reservar, o armar un paquete personalizado, indícale que debe ir al apartado de Contacto de la web o dale nuestros datos exactos: teléfono 611 79 48 42 o email saltysoultrips@gmail.com para que hable directamente con nosotros. NO TE INVENTES NÚMEROS DE TELÉFONO.`;

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
