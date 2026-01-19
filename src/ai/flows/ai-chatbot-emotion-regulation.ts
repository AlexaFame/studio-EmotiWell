'use server';

/**
 * @fileOverview An AI chatbot for emotion regulation.
 *
 * - aiChatbotForEmotionRegulation - A function that provides a friendly space for users to practice emotion regulation techniques.
 * - AIChatbotForEmotionRegulationInput - The input type for the aiChatbotForEmotionRegulation function.
 * - AIChatbotForEmotionRegulationOutput - The return type for the aiChatbotForEmotionRegulation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotForEmotionRegulationInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type AIChatbotForEmotionRegulationInput = z.infer<
  typeof AIChatbotForEmotionRegulationInputSchema
>;

const AIChatbotForEmotionRegulationOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AIChatbotForEmotionRegulationOutput = z.infer<
  typeof AIChatbotForEmotionRegulationOutputSchema
>;

export async function aiChatbotForEmotionRegulation(
  input: AIChatbotForEmotionRegulationInput
): Promise<AIChatbotForEmotionRegulationOutput> {
  return aiChatbotForEmotionRegulationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotForEmotionRegulationPrompt',
  input: {schema: AIChatbotForEmotionRegulationInputSchema},
  output: {schema: AIChatbotForEmotionRegulationOutputSchema},
  prompt: `You are a friendly and supportive AI chatbot designed to help users practice emotion regulation techniques.

  Your goal is to provide a safe space for users to express their feelings and develop better coping mechanisms.

  Respond to the following user message with empathy, understanding, and practical advice:

  User message: {{{message}}}

  Consider including calming techniques, emotional validation, or self-reflection prompts in your response.
  Always be encouraging and non-judgmental.
  Remember to keep your responses concise and easy to understand.
  Do not at anytime try to provide professional advice. If the user is in immediate harm or danger, recommend the user contact emergency services.
  `,
});

const aiChatbotForEmotionRegulationFlow = ai.defineFlow(
  {
    name: 'aiChatbotForEmotionRegulationFlow',
    inputSchema: AIChatbotForEmotionRegulationInputSchema,
    outputSchema: AIChatbotForEmotionRegulationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
