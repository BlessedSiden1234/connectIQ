'use server';

/**
 * @fileOverview An AI agent for summarizing the visual style of a YouTube channel.
 *
 * - summarizeYoutubeStyle - A function that handles the summarization process.
 * - SummarizeYoutubeStyleInput - The input type for the summarizeYoutubeStyle function.
 * - SummarizeYoutubeStyleOutput - The return type for the summarizeYoutubeStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeYoutubeStyleInputSchema = z.object({
  channelDescription: z.string().describe('The description of the YouTube channel.'),
  exampleVideoDataUri: z
    .string()
    .describe(
      'A frame from a representative video on the channel, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type SummarizeYoutubeStyleInput = z.infer<typeof SummarizeYoutubeStyleInputSchema>;

const SummarizeYoutubeStyleOutputSchema = z.object({
  styleSummary: z.string().describe('A summary of the visual style of the YouTube channel.'),
});
export type SummarizeYoutubeStyleOutput = z.infer<typeof SummarizeYoutubeStyleOutputSchema>;

export async function summarizeYoutubeStyle(input: SummarizeYoutubeStyleInput): Promise<SummarizeYoutubeStyleOutput> {
  return summarizeYoutubeStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeYoutubeStylePrompt',
  input: {schema: SummarizeYoutubeStyleInputSchema},
  output: {schema: SummarizeYoutubeStyleOutputSchema},
  prompt: `You are an expert marketing consultant, skilled at analyzing visual branding.

  Based on the YouTube channel description and a representative video frame, create a summary of the channel's visual style.

  Channel Description: {{{channelDescription}}}
  Video Frame: {{media url=exampleVideoDataUri}}

  Focus on elements like color palettes, typography, logo usage, and overall aesthetic.
  Your summary should be concise yet comprehensive, highlighting key visual elements that define the channel's brand.
  Write a paragraph that summarizes these observations.
  `,
});

const summarizeYoutubeStyleFlow = ai.defineFlow(
  {
    name: 'summarizeYoutubeStyleFlow',
    inputSchema: SummarizeYoutubeStyleInputSchema,
    outputSchema: SummarizeYoutubeStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
