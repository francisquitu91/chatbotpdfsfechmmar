import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatUrl } from '../utils/url';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="markdown-content"
      components={{
        h1: ({ children }) => <h1 className="text-xl font-bold mb-3 text-gray-900">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-bold mb-2 text-gray-900">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-bold mb-2 text-gray-900">{children}</h3>,
        p: ({ children }) => <p className="mb-2 text-gray-800">{children}</p>,
        ul: ({ children }) => <ul className="list-disc ml-4 mb-3 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-4 mb-3 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-gray-800">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-3 my-2 italic text-gray-800">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 px-1 rounded text-sm text-gray-900">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-3 text-sm text-gray-900">
            {children}
          </pre>
        ),
        u: ({ children }) => <span className="underline decoration-gray-900">{children}</span>,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {children}
          </a>
        ),
        text: ({ children }) => {
          const formattedText = formatUrl(children as string);
          return <>{formattedText}</>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}