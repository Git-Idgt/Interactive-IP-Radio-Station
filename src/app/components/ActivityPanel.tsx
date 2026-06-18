import { useState } from 'react';
import { Music, ThumbsUp, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface SongRequest {
  id: string;
  song: string;
  artist: string;
  requestedBy: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
}

interface ActivityPanelProps {
  listeners: number;
  songRequests: SongRequest[];
  currentPoll?: Poll;
  onRequestSong: (song: string, artist: string) => void;
  onVote: (requestId: string) => void;
  onPollVote: (optionIndex: number) => void;
}

export function ActivityPanel({
  listeners,
  songRequests,
  currentPoll,
  onRequestSong,
  onVote,
  onPollVote,
}: ActivityPanelProps) {
  const [songInput, setSongInput] = useState('');
  const [artistInput, setArtistInput] = useState('');

  const handleRequest = () => {
    if (songInput.trim() && artistInput.trim()) {
      onRequestSong(songInput, artistInput);
      setSongInput('');
      setArtistInput('');
    }
  };

  return (
    <div className="bg-[#2b2d31] rounded-lg p-4 h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-[#5865f2]" />
          <span className="text-white font-semibold">{listeners}</span>
          <span className="text-gray-400 text-sm">listeners</span>
        </div>
        <Badge className="bg-[#5865f2] hover:bg-[#4752c4]">
          <TrendingUp className="h-3 w-3 mr-1" />
          Active
        </Badge>
      </div>

      <Tabs defaultValue="requests" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-[#1e1f22]">
          <TabsTrigger value="requests" className="data-[state=active]:bg-[#5865f2]">
            <Music className="h-4 w-4 mr-2" />
            Requests
          </TabsTrigger>
          <TabsTrigger value="poll" className="data-[state=active]:bg-[#5865f2]">
            <MessageSquare className="h-4 w-4 mr-2" />
            Poll
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="flex-1 flex flex-col mt-4">
          <div className="space-y-2 mb-4">
            <Input
              value={songInput}
              onChange={(e) => setSongInput(e.target.value)}
              placeholder="Song title..."
              className="bg-[#1e1f22] border-none text-white placeholder:text-gray-500"
            />
            <Input
              value={artistInput}
              onChange={(e) => setArtistInput(e.target.value)}
              placeholder="Artist name..."
              className="bg-[#1e1f22] border-none text-white placeholder:text-gray-500"
            />
            <Button
              onClick={handleRequest}
              className="w-full bg-[#5865f2] hover:bg-[#4752c4]"
            >
              Request Song
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {songRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1e1f22] rounded p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {request.song}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {request.artist}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        by {request.requestedBy}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onVote(request.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-[#5865f2]"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {request.votes}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="poll" className="flex-1 flex flex-col mt-4">
          {currentPoll ? (
            <div className="space-y-3">
              <h3 className="text-white font-semibold mb-3">
                {currentPoll.question}
              </h3>
              {currentPoll.options.map((option, index) => {
                const totalVotes = currentPoll.options.reduce(
                  (sum, opt) => sum + opt.votes,
                  0
                );
                const percentage =
                  totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

                return (
                  <button
                    key={index}
                    onClick={() => onPollVote(index)}
                    className="w-full bg-[#1e1f22] rounded p-3 text-left hover:bg-[#26272b] transition-colors relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-[#5865f2] opacity-20"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="text-white">{option.text}</span>
                      <span className="text-sm text-gray-400">
                        {option.votes} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              No active poll
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
