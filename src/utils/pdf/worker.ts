import { GlobalWorkerOptions } from 'pdfjs-dist';
import * as PdfWorker from 'pdfjs-dist/build/pdf.worker.mjs';

export function setupPdfWorker() {
  if (typeof window !== 'undefined' && 'Worker' in window) {
    GlobalWorkerOptions.workerPort = new Worker(
      new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url),
      { type: 'module' }
    );
  }
}