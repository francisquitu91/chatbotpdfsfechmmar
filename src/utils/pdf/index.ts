import { setupPdfWorker } from './worker';
import { extractTextFromPdf } from './extractor';

// Initialize worker on module load
setupPdfWorker();

export async function extractPdfText(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    return await extractTextFromPdf(arrayBuffer);
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
}