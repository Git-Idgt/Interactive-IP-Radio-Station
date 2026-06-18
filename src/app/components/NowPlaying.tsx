import { Music2, User, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface NowPlayingProps {
  song: {
    title: string;
    artist: string;
    album?: string;
    artwork?: string;
    duration?: string;
  };
  dj: {
    name: string;
    avatar?: string;
  };
}

export function NowPlaying({ song, dj }: NowPlayingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2b2d31] rounded-lg p-6"
    >
      <div className="flex gap-4">
        <div className="relative">
          {song.artwork ? (
            <img
              src={song.artwork}
              alt={song.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg bg-[#1e1f22] flex items-center justify-center">
              <Music2 className="h-12 w-12 text-gray-600" />
            </div>
          )}
          <motion.div
            className="absolute inset-0 border-2 border-[#5865f2] rounded-lg"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">
            {song.title}
          </h3>
          <p className="text-gray-400 mb-3">{song.artist}</p>

          {song.album && (
            <p className="text-sm text-gray-500 mb-2">
              Album: {song.album}
            </p>
          )}

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">DJ on Air</p>
                <p className="text-sm text-white">{dj.name}</p>
              </div>
            </div>

            {song.duration && (
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{song.duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
