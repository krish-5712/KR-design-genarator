import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { Style, AspectRatio } from '../types';

interface GenerationOptions {
    style: Style;
    aspectRatio: AspectRatio;
    negativePrompt: string;
    autoEnhance: boolean;
}

interface RefineOptions {
  style: Style;
  aspectRatio: AspectRatio;
  negativePrompt: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const enhancePrompt = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `Your task is to act as a creative prompt engineer for an advanced AI image generator. Take the user's simple idea and transform it into a rich, detailed, and evocative prompt. Focus on the core subject provided by the user. Add descriptive details about the setting, lighting, mood, composition, and artistic style. Ensure the prompt is a single, cohesive paragraph. Do not add extra subjects that the user didn't ask for.

User's idea: "${prompt}"

Enhanced Prompt:`,
            config: {
                temperature: 0.8,
                topP: 1,
                topK: 32,
                maxOutputTokens: 200,
            }
        });

        if (response && response.text) {
          return response.text.trim();
        }

        console.warn("Prompt enhancement returned an empty or blocked response. Falling back to the original prompt.");
        return prompt;

    } catch (error) {
        console.error("Error enhancing prompt:", error);
        // Fallback to original prompt if enhancement fails
        return prompt;
    }
};

const parseGeminiResponse = (response: GenerateContentResponse): string => {
    if (response.candidates?.[0]?.finishReason === 'SAFETY') {
       throw new Error("The request was blocked due to safety restrictions. Please modify your prompt and try again.");
    }
    
    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData && part.inlineData.mimeType.startsWith('image/'));

    if (imagePart?.inlineData) {
      const { data, mimeType } = imagePart.inlineData;
      return `data:${mimeType};base64,${data}`;
    }
    
    const textPart = response.candidates?.[0]?.content?.parts?.find(part => typeof part.text === 'string');
    if (textPart?.text) {
      throw new Error(`Failed to process image. The model responded with: "${textPart.text}"`);
    }

    throw new Error("No image was generated and no error message was provided. Please try a different prompt.");
};

export const generateImage = async (prompt: string, options: GenerationOptions): Promise<string> => {
  try {
    let finalPrompt = prompt;
    if (options.autoEnhance) {
      console.log("Enhancing prompt...");
      finalPrompt = await enhancePrompt(prompt);
      console.log("Enhanced prompt:", finalPrompt);
    }
    
    const fullPrompt = `
      Create a ${options.style} image.
      Aspect Ratio: ${options.aspectRatio}.
      Subject: ${finalPrompt}.
      ${options.negativePrompt ? `Negative Prompt (exclude these elements): ${options.negativePrompt}.` : ''}
    `.trim();

    console.log("Generating image with full prompt:", fullPrompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });
    return parseGeminiResponse(response);
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("Failed to communicate with the image generation service.");
  }
};

export const refineImage = async (base64Image: string, prompt: string, options?: RefineOptions): Promise<string> => {
    try {
        const match = base64Image.match(/data:(image\/.+);base64,(.+)/);
        if (!match) {
            throw new Error("Invalid image data URL format for refinement.");
        }
        const [, mimeType, data] = match;

        let finalPrompt = prompt;
        if (options) {
            finalPrompt = `
                Apply the following changes to the image, maintaining a ${options.style} style.
                The final image should have an aspect ratio of approximately ${options.aspectRatio}.
                Change description: ${prompt}.
                ${options.negativePrompt ? `Negative Prompt (exclude these elements from the final image): ${options.negativePrompt}.` : ''}
            `.trim();
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { mimeType, data } },
                    { text: finalPrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        return parseGeminiResponse(response);
    } catch (error) {
        console.error("Error refining image with Gemini API:", error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Failed to communicate with the image generation service for refinement.");
    }
};
