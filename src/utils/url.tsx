import React from 'react';

const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/[^\s]*)?/g;

export function formatUrl(text: string): React.ReactNode {
  if (typeof text !== 'string') return text;

  const parts = text.split(URL_REGEX);
  if (parts.length === 1) return text;

  const matches = text.match(URL_REGEX);
  const result: React.ReactNode[] = [];
  let currentIndex = 0;

  matches?.forEach((match, i) => {
    const index = text.indexOf(match, currentIndex);
    
    // Add text before the URL
    if (index > currentIndex) {
      result.push(text.slice(currentIndex, index));
    }

    // Add the URL as a link
    const url = match.startsWith('http') ? match : `http://${match}`;
    result.push(
      <a
        key={i}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {match}
      </a>
    );

    currentIndex = index + match.length;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    result.push(text.slice(currentIndex));
  }

  return result;
}