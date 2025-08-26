export interface Message {
  text: string;
  isUser: boolean;
  type: 'text' | 'audio';
  audioUrl?: string;
}