import React from 'react';
import { FileText, X } from 'lucide-react';
import { UploadedFile } from '../types/file';

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">{file.name}</span>
          </div>
          <button
            onClick={() => onRemove(file.id)}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
}