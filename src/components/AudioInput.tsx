import React, { useState, useCallback, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { createAudioBlob } from '../utils/audio';

interface AudioInputProps {
  onAudioMessage: (text: string, audioUrl: string) => Promise<void>;
}

export function AudioInput({ onAudioMessage }: AudioInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });
      return stream;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      if (isMobileDevice) {
        alert('Para usar el micrófono en dispositivos móviles:\n1. Asegúrate de dar permisos al micrófono\n2. Usa Safari en iOS o Chrome en Android\n3. Accede desde el sitio web seguro (https)');
      } else {
        alert('Para usar el micrófono, por favor conceda permisos de acceso en su navegador.');
      }
      throw error;
    }
  };

  const startListening = useCallback(async () => {
    try {
      // Request microphone permission first
      const stream = await requestMicrophonePermission();

      // Start speech recognition with mobile-specific settings
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-ES';
      recognition.maxAlternatives = 1;

      let finalTranscript = '';

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
        if (event.error === 'not-allowed') {
          if (isMobileDevice) {
            alert('Error de acceso al micrófono. Por favor:\n1. Verifica los permisos del micrófono\n2. Usa Safari (iOS) o Chrome (Android)\n3. Asegúrate de acceder por https');
          } else {
            alert('Para usar el reconocimiento de voz, por favor conceda permisos de acceso al micrófono.');
          }
        }
      };

      recognition.onend = async () => {
        if (finalTranscript.trim() && mediaRecorderRef.current) {
          setIsProcessing(true);
          mediaRecorderRef.current.stop();
        }
        setIsListening(false);
      };

      // Configure MediaRecorder with mobile-optimized settings
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
          ? 'audio/webm;codecs=opus' 
          : 'audio/mp4',
        audioBitsPerSecond: 128000
      });
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioUrl = await createAudioBlob(audioChunksRef.current);
        await onAudioMessage(finalTranscript, audioUrl);
        setIsProcessing(false);
        
        // Cleanup
        stream.getTracks().forEach(track => track.stop());
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      
      setRecognition(recognition);
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting audio recording:', error);
      setIsListening(false);
      setIsProcessing(false);
    }
  }, [onAudioMessage, isMobileDevice]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <button
      onClick={toggleListening}
      disabled={isProcessing}
      className={`p-2 rounded-lg transition-colors ${
        isProcessing 
          ? 'bg-gray-400 cursor-not-allowed'
          : isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-500 hover:bg-blue-600'
      }`}
      title={
        isProcessing 
          ? 'Procesando audio...' 
          : isListening 
            ? 'Detener grabación' 
            : 'Iniciar grabación'
      }
    >
      {isProcessing ? (
        <Loader2 className="w-5 h-5 text-white animate-spin" />
      ) : isListening ? (
        <MicOff className="w-5 h-5 text-white" />
      ) : (
        <Mic className="w-5 h-5 text-white" />
      )}
    </button>
  );
}