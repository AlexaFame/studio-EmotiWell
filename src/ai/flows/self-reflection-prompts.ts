'use server';
/**
 * @fileOverview A self-reflection prompts AI agent.
 *
 * - generateSelfReflectionPrompt - A function that generates personalized self-reflection prompts based on the user's emotional state.
 * - SelfReflectionPromptInput - The input type for the generateSelfReflectionPrompt function.
 * - SelfReflectionPromptOutput - The return type for the generateSelfReflectionPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelfReflectionPromptInputSchema = z.object({
  emotionalState: z
    .string()
    .describe('The current emotional state of the user.'),
});
export type SelfReflectionPromptInput = z.infer<typeof SelfReflectionPromptInputSchema>;

const SelfReflectionPromptOutputSchema = z.object({
  prompt: z.string().describe('A personalized self-reflection prompt.'),
});
export type SelfReflectionPromptOutput = z.infer<typeof SelfReflectionPromptOutputSchema>;

export async function generateSelfReflectionPrompt(
  input: SelfReflectionPromptInput
): Promise<SelfReflectionPromptOutput> {
  return generateSelfReflectionPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selfReflectionPrompt',
  input: {schema: SelfReflectionPromptInputSchema},
  output: {schema: SelfReflectionPromptOutputSchema},
  prompt: `Based on the user's current emotional state of {{{emotionalState}}}, generate a self-reflection prompt that encourages them to understand the relationship between their feelings, triggers, and coping mechanisms. The prompt should be open-ended and encourage deep thinking about their emotional state. For example, if the user is feeling stressed, a good prompt could be "What specific events or thoughts are contributing to your stress today, and what is one small step you can take to address them?"
`,
});

const generateSelfReflectionPromptFlow = ai.defineFlow(
  {
    name: 'generateSelfReflectionPromptFlow',
    inputSchema: SelfReflectionPromptInputSchema,
    outputSchema: SelfReflectionPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
