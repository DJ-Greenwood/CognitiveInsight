'use server';

/**
 * @fileOverview Summarizes key insights from regulatory documents for AI governance.
 *
 * - summarizeRegulatoryDocument - A function that summarizes the key implications of a regulatory document for AI governance.
 * - SummarizeRegulatoryDocumentInput - The input type for the summarizeRegulatoryDocument function.
 * - SummarizeRegulatoryDocumentOutput - The return type for the summarizeRegulatoryDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRegulatoryDocumentInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the regulatory document to summarize.'),
});
export type SummarizeRegulatoryDocumentInput = z.infer<
  typeof SummarizeRegulatoryDocumentInputSchema
>;

const SummarizeRegulatoryDocumentOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the regulatory document, focusing on its key implications for AI governance and compliance.'
    ),
});
export type SummarizeRegulatoryDocumentOutput = z.infer<
  typeof SummarizeRegulatoryDocumentOutputSchema
>;

export async function summarizeRegulatoryDocument(
  input: SummarizeRegulatoryDocumentInput
): Promise<SummarizeRegulatoryDocumentOutput> {
  return summarizeRegulatoryDocumentFlow(input);
}

const summarizeRegulatoryDocumentPrompt = ai.definePrompt({
  name: 'summarizeRegulatoryDocumentPrompt',
  input: {schema: SummarizeRegulatoryDocumentInputSchema},
  output: {schema: SummarizeRegulatoryDocumentOutputSchema},
  prompt: `You are an AI governance expert. Summarize the following regulatory document, focusing on its key implications for AI governance and compliance. Provide a concise and actionable summary for AI practitioners.

Document:
{{documentText}}`,
});

const summarizeRegulatoryDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeRegulatoryDocumentFlow',
    inputSchema: SummarizeRegulatoryDocumentInputSchema,
    outputSchema: SummarizeRegulatoryDocumentOutputSchema,
  },
  async input => {
    const {output} = await summarizeRegulatoryDocumentPrompt(input);
    return output!;
  }
);
