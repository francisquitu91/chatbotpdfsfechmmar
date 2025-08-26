import { extractPdfText } from './pdf';

export function generateFileId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function readFileContent(file: File): Promise<string> {
  try {
    if (file.type === 'application/pdf') {
      return await extractPdfText(file);
    }
    return await file.text();
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Failed to read file content');
  }
}

export function validatePdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}