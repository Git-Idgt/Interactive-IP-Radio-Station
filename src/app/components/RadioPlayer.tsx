import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

interface RadioPlayerProps {
  streamUrl: string;
  isLive: boolean;
}

export function RadioPlayer({ streamUrl, isLive }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-[#2b2d31] rounded-lg p-6">
      <audio ref={audioRef} src={streamUrl} />

      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          size="lg"
          className="h-14 w-14 rounded-full bg-[#5865f2] hover:bg-[#4752c4]"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" fill="currentColor" />
          ) : (
            <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
          )}
        </Button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">
              {isPlaying ? 'Now Playing' : 'Stream Paused'}
            </span>
            {isLive && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-400 uppercase tracking-wide">Live</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-gray-400 hover:text-white"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>

            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />

            <span className="text-xs text-gray-400 w-10 text-right">
              {isMuted ? 0 : volume}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
