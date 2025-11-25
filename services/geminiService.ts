import { GoogleGenAI } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates an architectural redesign based on an input image and a text prompt.
 * Uses gemini-2.5-flash-image for "nano banana" capabilities.
 */
export const generateArchitecturalDesign = async (
  base64Image: string,
  mimeType: string,
  userPrompt: string
): Promise<{ imageUrl: string | null; text: string | null }> => {
  const ai = getGeminiClient();

  try {
    const prompt = `
      Act as a professional architect and interior designer.
      I have provided an image of a space. 
      Task: ${userPrompt}
      
      Requirements:
      1. Maintain the structural integrity and perspective of the original image.
      2. Apply high-quality photorealistic textures and lighting.
      3. If the user asks for a specific style (e.g., modern, rustic), apply it strictly.
      4. Output a high-quality modified image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      // Using standard config for image generation/editing tasks
      config: {
        // Nano banana models do not support responseMimeType or responseSchema
      }
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Assume PNG if not specified, though Gemini usually returns the same or compatible type
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    return { imageUrl, text };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
