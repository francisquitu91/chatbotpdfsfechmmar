export function convertHtmlToMarkdown(text: string): string {
  return text
    // Convert HTML tags to markdown
    .replace(/<\/?u>/g, '__')
    .replace(/<\/?strong>/g, '**')
    .replace(/<\/?em>/g, '_')
    .replace(/<\/?b>/g, '**')
    .replace(/<\/?i>/g, '_');
}