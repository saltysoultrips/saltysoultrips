import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

async function main() {
  console.log("Checking API Key format...");
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error("GEMINI_API_KEY not found in .env");
    process.exit(1);
  }
  
  console.log("Key found:", key.substring(0, 5) + "...");
  
  const google = createGoogleGenerativeAI({
    apiKey: key,
  });

  try {
    console.log("Attempting to generate text with Gemini...");
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Responde solo con la palabra "OK".',
    });
    console.log("Success! Gemini response:", text);
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    if (error.cause) console.error("Cause:", error.cause);
  }
}

main();
