import { getDocument } from 'pdfjs-dist';
import type { TextContent } from 'pdfjs-dist/types/src/display/api';

export async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string> {
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const textContent: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent() as TextContent;
    const text = content.items
      .map(item => 'str' in item ? item.str : '')
      .join(' ');
    textContent.push(text);
  }

  return textContent.join('\n\n');
}