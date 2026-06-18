import { useState } from 'react';
import { Video, VideoOff, Maximize2, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface LiveVideoFeedProps {
  streamUrl: string;
  djName: string;
  viewerCount: number;
  isLive: boolean;
}

export function LiveVideoFeed({
  streamUrl,
  djName,
  viewerCount,
  isLive,
}: LiveVideoFeedProps) {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="bg-[#2b2d31] rounded-lg overflow-hidden">
      <div className="relative aspect-video bg-[#1e1f22] group">
        {isVideoEnabled && isLive ? (
          <>
            <video
              src={streamUrl}
              autoPlay
              muted
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-red-500 hover:bg-red-600 gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </Badge>
              <Badge className="bg-black/60 hover:bg-black/70 gap-2">
                <Users className="h-3 w-3" />
                {viewerCount} watching
              </Badge>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <VideoOff className="h-16 w-16 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">
                {isLive ? 'Video disabled' : 'DJ is offline'}
              </p>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center">
                <Video className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{djName}</p>
                <p className="text-gray-400 text-xs">Live from the studio</p>
              </div>
            </div>

            <div className="flex gap-2">
              {isLive && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleVideo}
                  className="text-white hover:bg-white/20"
                >
                  {isVideoEnabled ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <VideoOff className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-4 border-t border-[#1e1f22]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold">DJ Cam</h3>
            <p className="text-sm text-gray-400">
              {isLive ? 'Broadcasting live' : 'Stream offline'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-500'}`} />
            <span className="text-xs">{isLive ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
