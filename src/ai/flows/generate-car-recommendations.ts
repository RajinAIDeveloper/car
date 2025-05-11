// src/ai/flows/generate-car-recommendations.ts
'use server';

/**
 * @fileOverview Car recommendation AI agent.
 *
 * - generateCarRecommendations - A function that generates car recommendations.
 * - GenerateCarRecommendationsInput - The input type for the generateCarRecommendations function.
 * - GenerateCarRecommendationsOutput - The return type for the generateCarRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCarRecommendationsInputSchema = z.object({
  selectedCar: z.object({
    make: z.string().describe('The make of the selected car.'),
    model: z.string().describe('The model of the selected car.'),
    year: z.number().describe('The year of the selected car.'),
    price: z.number().describe('The price of the selected car.'),
    features: z.array(z.string()).describe('Key features of the selected car.'),
  }).describe('The currently selected car.'),
  userPreferences: z.string().optional().describe('Optional user preferences for car features, like fuel efficiency or safety.'),
});
export type GenerateCarRecommendationsInput = z.infer<typeof GenerateCarRecommendationsInputSchema>;

const GenerateCarRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      make: z.string().describe('The make of the recommended car.'),
      model: z.string().describe('The model of the recommended car.'),
      year: z.number().describe('The year of the recommended car.'),
      price: z.number().describe('The price of the recommended car.'),
      features: z.array(z.string()).describe('Key features of the recommended car.'),
      reasoning: z.string().describe('Explanation of why this car is recommended based on the selected car and user preferences.'),
    })
  ).describe('A list of recommended cars with their details and reasoning.'),
});
export type GenerateCarRecommendationsOutput = z.infer<typeof GenerateCarRecommendationsOutputSchema>;

export async function generateCarRecommendations(input: GenerateCarRecommendationsInput): Promise<GenerateCarRecommendationsOutput> {
  return generateCarRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCarRecommendationsPrompt',
  input: {schema: GenerateCarRecommendationsInputSchema},
  output: {schema: GenerateCarRecommendationsOutputSchema},
  prompt: `You are an expert car recommendation agent. Given a user's selected car and optional preferences, you will recommend similar cars.

Selected Car:
Make: {{{selectedCar.make}}}
Model: {{{selectedCar.model}}}
Year: {{{selectedCar.year}}}
Price: {{{selectedCar.price}}}
Features: {{#each selectedCar.features}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

{{#if userPreferences}}
User Preferences: {{{userPreferences}}}
{{/if}}

Recommend cars that are similar to the selected car, considering the user's preferences if provided. For each recommended car, explain why it is a good alternative, highlighting key features and price comparisons. Be concise and provide clear reasoning.

Format your response as a JSON object with a 'recommendations' array. Each object in the array should have 'make', 'model', 'year', 'price', 'features', and 'reasoning' fields.
`,
});

const generateCarRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCarRecommendationsFlow',
    inputSchema: GenerateCarRecommendationsInputSchema,
    outputSchema: GenerateCarRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
