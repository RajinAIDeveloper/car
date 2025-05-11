// src/ai/flows/identify-car-from-image.ts
'use server';
/**
 * @fileOverview AI agent to identify car details from an image.
 *
 * - identifyCarFromImage - A function that analyzes an image to identify car make, model, year, and color.
 * - IdentifyCarFromImageInput - The input type for the identifyCarFromImage function.
 * - IdentifyCarFromImageOutput - The return type for the identifyCarFromImage function.
 * - IdentifiedCarInfo - The type for structured car information.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyCarFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a car, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyCarFromImageInput = z.infer<typeof IdentifyCarFromImageInputSchema>;

const IdentifiedCarInfoSchema = z.object({
  make: z.string().optional().describe("The identified make of the car, e.g., Toyota. If not identifiable, omit this field."),
  model: z.string().optional().describe("The identified model of the car, e.g., Camry. If not identifiable, omit this field."),
  year: z.string().optional().describe("The identified year of the car as a string, e.g., '2023'. If not discernible, omit this field."),
  color: z.string().optional().describe("The identified primary color of the car, e.g., Red. If not discernible, omit this field."),
  description: z.string().optional().describe("A brief description or justification for the identification, or notes on visual characteristics if specific make/model is unclear."),
});
export type IdentifiedCarInfo = z.infer<typeof IdentifiedCarInfoSchema>;

const IdentifyCarFromImageOutputSchema = z.object({
  carInfo: IdentifiedCarInfoSchema,
  matchFound: z.boolean().describe("True if a car was confidently identified with at least make and model, false otherwise."),
  reasoning: z.string().describe("Explanation of the identification confidence. If no car is found or identification is highly uncertain, explain why (e.g., 'Image is blurry', 'No car visible in the image', 'Could be a sedan, but make/model unclear')."),
});
export type IdentifyCarFromImageOutput = z.infer<typeof IdentifyCarFromImageOutputSchema>;

export async function identifyCarFromImage(input: IdentifyCarFromImageInput): Promise<IdentifyCarFromImageOutput> {
  return identifyCarFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyCarFromImagePrompt',
  input: {schema: IdentifyCarFromImageInputSchema},
  output: {schema: IdentifyCarFromImageOutputSchema},
  prompt: `You are an expert automotive AI assistant. Your task is to analyze the provided image and identify the car in it.

Photo: {{media url=photoDataUri}}

Analyze the image carefully. Identify the following details if possible:
- Make (e.g., Toyota, Honda, Ford)
- Model (e.g., Camry, Civic, F-150)
- Year (e.g., 2023 - provide as a string)
- Color (e.g., Red, Blue, Silver)

If you can confidently identify at least the make and model, set 'matchFound' to true. Provide any identified details in the 'carInfo' object.
If the image does not contain a car, or if you cannot confidently identify the make and model, set 'matchFound' to false.
In the 'reasoning' field, explain your findings. For example:
- If a car is identified: "Identified a [Color] [Year] [Make] [Model]."
- If no car: "No car is visible in the provided image."
- If uncertain: "A car is visible, but details like make and model are unclear due to image quality/angle."
- If partial identification: "A red SUV is visible, likely a mid-size model, but specific make/model cannot be determined."

Provide your response in the specified JSON format. Omit fields from 'carInfo' if they cannot be determined. For example, if only make and model are clear, only include those. If you can describe the car (e.g. "red hatchback") but not the specific make/model, include that in carInfo.description and set matchFound to false.
`,
});

const identifyCarFromImageFlow = ai.defineFlow(
  {
    name: 'identifyCarFromImageFlow',
    inputSchema: IdentifyCarFromImageInputSchema,
    outputSchema: IdentifyCarFromImageOutputSchema,
  },
  async (input: IdentifyCarFromImageInput) => {
    try {
        const {output} = await prompt(input);
        if (!output) {
            return {
                carInfo: {},
                matchFound: false,
                reasoning: "AI model did not return a valid response."
            }
        }
        // Ensure carInfo is at least an empty object if not provided by the model
        if (!output.carInfo) {
            output.carInfo = {};
        }
        return output;
    } catch (error) {
        console.error("Error in identifyCarFromImageFlow:", error);
        return {
            carInfo: {},
            matchFound: false,
            reasoning: "An error occurred while processing the image with AI."
        }
    }
  }
);
