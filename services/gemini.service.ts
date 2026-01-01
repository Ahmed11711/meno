
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Service to leverage Gemini AI for content generation.
 */
export const geminiService = {
  /**
   * Generates a creative description for a new menu item.
   */
  generateDescription: async (itemName: string, ingredients: string[]): Promise<string> => {
    const prompt = `Write a short, appetizing, and creative description in Arabic for a menu item named "${itemName}". It contains these ingredients: ${ingredients.join(', ')}. Keep it under 150 characters. Use a luxury cafe tone.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.8,
          systemInstruction: 'أنت كاتب محتوى متخصص في الأطعمة والمقاهي الفاخرة. تكتب باللغة العربية بأسلوب جذاب وشهي.'
        }
      });
      return response.text.trim();
    } catch (error) {
      console.error('Gemini generation failed:', error);
      return "وصف لذيذ ومحضر بعناية من أجود المكونات الطازجة.";
    }
  }
};
