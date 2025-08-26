import { getDocument } from 'pdfjs-dist';
import { setupPdfWorker } from './pdf/worker';

// Initialize worker
setupPdfWorker();

export async function extractPdfText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const textContent: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map(item => 'str' in item ? item.str : '')
        .join(' ');
      textContent.push(text);
    }

    return textContent.join('\n\n');
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
}