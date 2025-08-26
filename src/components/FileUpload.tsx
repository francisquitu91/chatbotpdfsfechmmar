import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { UploadedFile } from '../types/file';
import { generateFileId, readFileContent, validatePdfFile } from '../utils/file';
import { FileList } from './FileList';

interface FileUploadProps {
  onFileSelect: (content: string) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const processFiles = async (fileList: FileList) => {
    const newFiles: UploadedFile[] = [];

    for (const file of Array.from(fileList)) {
      if (!validatePdfFile(file)) {
        alert(`${file.name} is not a PDF file`);
        continue;
      }

      try {
        const content = await readFileContent(file);
        newFiles.push({
          id: generateFileId(),
          name: file.name,
          content
        });
      } catch (error) {
        alert(`Error reading ${file.name}`);
      }
    }

    if (newFiles.length > 0) {
      const combinedContent = newFiles.map(file => file.content).join('\n\n');
      setFiles(prev => [...prev, ...newFiles]);
      onFileSelect(combinedContent);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;
    processFiles(fileList);
    event.target.value = ''; // Reset input
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="w-full space-y-4">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex items-center justify-center w-full h-32 px-4 transition border-2 rounded-lg appearance-none cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 border-dashed bg-white hover:border-gray-400'}`}
      >
        <div className="flex flex-col items-center space-y-2">
          <Upload className="w-6 h-6 text-gray-600" />
          <span className="font-medium text-gray-600">
            Drop PDF files or click to upload
          </span>
        </div>
        <input
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      
      <FileList files={files} onRemove={handleRemoveFile} />
    </div>
  );
}