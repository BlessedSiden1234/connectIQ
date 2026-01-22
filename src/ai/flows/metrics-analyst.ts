// metrics-analyst.ts
'use server';
/**
 * @fileOverview An AI metrics analyst that answers questions about social media performance.
 *
 * - analyzeMetrics - A function that handles the analysis of social media metrics.
 * - AnalyzeMetricsInput - The input type for the analyzeMetrics function.
 * - AnalyzeMetricsOutput - The return type for the analyzeMetrics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMetricsInputSchema = z.object({
  metricsData: z.string().describe('The social media metrics data as a JSON string.'),
  query: z.string().describe('The question about the social media performance.'),
});
export type AnalyzeMetricsInput = z.infer<typeof AnalyzeMetricsInputSchema>;

const AnalyzeMetricsOutputSchema = z.object({
  analysis: z.string().describe('The analysis of the social media performance.'),
});
export type AnalyzeMetricsOutput = z.infer<typeof AnalyzeMetricsOutputSchema>;

export async function analyzeMetrics(input: AnalyzeMetricsInput): Promise<AnalyzeMetricsOutput> {
  return analyzeMetricsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMetricsPrompt',
  input: {schema: AnalyzeMetricsInputSchema},
  output: {schema: AnalyzeMetricsOutputSchema},
  prompt: `You are an AI social media analyst. You are provided with social media metrics data and a question about the performance.
  You should analyze the data and answer the question based on the data.

  Metrics Data:
  {{metricsData}}

  Question:
  {{query}}
  `,
});

const analyzeMetricsFlow = ai.defineFlow(
  {
    name: 'analyzeMetricsFlow',
    inputSchema: AnalyzeMetricsInputSchema,
    outputSchema: AnalyzeMetricsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
