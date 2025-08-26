import React from 'react';
import { Play, Pause, Radio } from 'lucide-react';

interface AudioMessageProps {
  audioUrl: string;
}

export function AudioMessage({ audioUrl }: AudioMessageProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onended = () => setIsPlaying(false);
      audio.onloadedmetadata = () => setDuration(audio.duration);
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl">
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-1" />
        )}
      </button>

      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <span className="text-sm text-gray-600 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">Voice message</span>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}