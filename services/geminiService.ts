
import { GoogleGenAI, Type } from "@google/genai";
import type { TrackingInfo } from '../types';

const getPrompt = (trackingNumber: string) => `
You are a shipping logistics expert. Your task is to identify the correct shipping carrier and construct a tracking URL based on a given tracking number. Analyze the provided tracking number and use the following rules to determine the carrier. Respond ONLY with a JSON object that matches the specified schema.

Tracking Number: "${trackingNumber}"

Rules:
1. If the number is 13 characters, starts with "CH", "CM", or "CU", has 9 digits in the middle, and ends with "DE", the carrier is "DHL Alemania". The URL is "https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${trackingNumber}".
2. If the number is 13 characters and starts with "GBT" followed by numbers, the carrier is "GlobalTrans". The URL is "https://globaltranstoledo.com/#tracking".
3. If the number consists of 22 digits, the carrier is "CTT Express". The URL is "https://www.cttexpress.com/localizador-de-envios/".
4. If the number is 8 characters and starts with "ZWLH", the carrier is "GLS". The URL is "https://mygls.gls-spain.es/parcel-tracking/${trackingNumber}".
5. If the number is 23 characters, starts with "JJD", and the rest are mostly digits, the carrier is "DHL Alemania". The URL is "https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${trackingNumber}".
6. If the number is between 8 and 14 digits and contains only numbers, the carrier is "GLS". The URL is "https://mygls.gls-spain.es/parcel-tracking/${trackingNumber}".
7. If the number is 18 characters and starts with "1Z", the carrier is "UPS". The URL is "https://www.ups.com/track?loc=es_ES&tracknum=${trackingNumber}".
8. If the number does not match any of these patterns, the carrier is "Desconocido" and the URL is an empty string.

Provide your answer in a JSON object.
`;

const schema = {
  type: Type.OBJECT,
  properties: {
    carrier: {
      type: Type.STRING,
      description: "El nombre del transportista.",
    },
    url: {
      type: Type.STRING,
      description: "La URL de seguimiento directa para el número proporcionado. Si es desconocida, debe ser una cadena vacía.",
    },
  },
  required: ["carrier", "url"],
};


export const getTrackingInfo = async (trackingNumber: string): Promise<TrackingInfo> => {
  // IMPORTANT: The API key is injected automatically by the execution environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: getPrompt(trackingNumber),
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  try {
    const jsonText = response.text?.trim();
    if (!jsonText) throw new Error("Empty response");
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as TrackingInfo;
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    throw new Error("Invalid JSON response from API.");
  }
};

export const createChatSession = () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  // Detect browser language to inform the system instruction
  const userLang = typeof navigator !== 'undefined' ? navigator.language : 'es';

  return ai.chats.create({
    model: "gemini-3-pro-preview",
    config: {
      systemInstruction: `You are a helpful and polite customer support assistant for "R_PROJEKT", a package tracking platform. 
      
      Your responsibilities:
      1. Help users understand how to use the tracking tool (they need to enter a number).
      2. Explain that we support carriers like DHL, GLS, UPS, CTT Express, and GlobalTrans.
      3. If a user asks about a specific tracking number in the chat, politely ask them to use the main search bar on the page for the best experience, but you can try to identify the carrier pattern if they insist.
      4. CRITICAL: Detect the language the user is speaking in and respond in that SAME language. The user's browser locale is likely "${userLang}", but prioritize the language of the message they send you.
      5. Keep responses concise and helpful.
      `,
    },
  });
};
