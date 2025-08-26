export async function createAudioBlob(audioChunks: Blob[]): Promise<string> {
  const audioBlob = new Blob(audioChunks, { type: 'audio/mp4' });
  return URL.createObjectURL(audioBlob);
}