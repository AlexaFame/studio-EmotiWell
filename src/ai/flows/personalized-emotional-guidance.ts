'use server';
/**
 * @fileOverview Provides personalized guidance based on the user's emotional state.
 *
 * - personalizedEmotionalGuidance - A function that provides personalized guidance based on the user's emotional state.
 * - PersonalizedEmotionalGuidanceInput - The input type for the personalizedEmotionalGuidance function.
 * - PersonalizedEmotionalGuidanceOutput - The return type for the personalizedEmotionalGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedEmotionalGuidanceInputSchema = z.object({
  emotionalState: z
    .string()
    .describe('The current emotional state of the user (e.g., stress, loneliness, anxiety, sadness, low motivation).'),
});
export type PersonalizedEmotionalGuidanceInput = z.infer<typeof PersonalizedEmotionalGuidanceInputSchema>;

const PersonalizedEmotionalGuidanceOutputSchema = z.object({
  guidance: z.string().describe('Personalized guidance including calming techniques, coping strategies, emotional validation, and gentle encouragement.'),
});
export type PersonalizedEmotionalGuidanceOutput = z.infer<typeof PersonalizedEmotionalGuidanceOutputSchema>;

export async function personalizedEmotionalGuidance(
  input: PersonalizedEmotionalGuidanceInput
): Promise<PersonalizedEmotionalGuidanceOutput> {
  return personalizedEmotionalGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedEmotionalGuidancePrompt',
  input: {schema: PersonalizedEmotionalGuidanceInputSchema},
  output: {schema: PersonalizedEmotionalGuidanceOutputSchema},
  prompt: `You are an empathetic AI assistant designed to provide personalized guidance to users based on their emotional state.

  The user is currently experiencing: {{{emotionalState}}}.

  Provide guidance that includes calming techniques, coping strategies, emotional validation, and gentle encouragement tailored to their emotional state.
  Be friendly, compassionate and supportive.
  Do not ask the user questions.
  Keep responses under 200 words.
  Do not provide disclaimers about consulting a professional.`,
});

const personalizedEmotionalGuidanceFlow = ai.defineFlow(
  {
    name: 'personalizedEmotionalGuidanceFlow',
    inputSchema: PersonalizedEmotionalGuidanceInputSchema,
    outputSchema: PersonalizedEmotionalGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
