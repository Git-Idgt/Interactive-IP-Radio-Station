import { useState } from "react";
import { RadioPlayer } from "./components/RadioPlayer";
import { NowPlaying } from "./components/NowPlaying";
import { LiveVideoFeed } from "./components/LiveVideoFeed";
import { ChatBox } from "./components/ChatBox";
import { ActivityPanel } from "./components/ActivityPanel";
import { Radio } from "lucide-react";

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      user: "DJ Idgt",
      content:
        "Welcome to D-Cord Live! Drop your song requests below!",
      timestamp: new Date(Date.now() - 300000),
      color: "#ee0808",
    },
    {
      id: "2",
      user: "Helen Kella",
      content: "Great stream tonight! Love the vibes 🎵",
      timestamp: new Date(Date.now() - 180000),
      color: "#57f287",
    },
    {
      id: "3",
      user: "Mr. Microsoft",
      content: "Can you play some synthwave next?",
      timestamp: new Date(Date.now() - 60000),
      color: "#fee75c",
    },
  ]);

  const [songRequests, setSongRequests] = useState([
    {
      id: "1",
      song: "Ritalin",
      artist: "Dexter and the Moonrocks",
      requestedBy: "DJ Idgt",
      votes: 92,
    },
    {
      id: "2",
      song: "Ensenada",
      artist: "Sublime",
      requestedBy: "brappp22",
      votes: 78,
    },
    {
      id: "3",
      song: "Squad goals",
      artist: "Prof",
      requestedBy: "Helen Kella",
      votes: 65,
    },
  ]);

  const [listeners] = useState(247);

  const currentSong = {
    title: "Theresa",
    artist: "Ciggerettes @ Sunset",
    album: "Possum Rock",
    duration: "2:44",
    artwork:
      "https://i.ibb.co/ycQYFRKP/Screenshot-2026-06-14-100641.png",
  };

  const currentDj = {
    name: "DJ Idgt",
    avatar: "https://i.ibb.co/LDXY1rhP/IDGT-head.png",
  };

  const currentPoll = {
    id: "1",
    question: "What genre should we play next hour?",
    options: [
      { text: "Reggae", votes: 25 },
      { text: "Indie", votes: 32 },
      { text: "Rock", votes: 58 },
      { text: "Pop", votes: 28 },
    ],
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      user: "You",
      content,
      timestamp: new Date(),
      color: "#eb459e",
    };
    setMessages([...messages, newMessage]);
  };

  const handleRequestSong = (song: string, artist: string) => {
    const newRequest = {
      id: Date.now().toString(),
      song,
      artist,
      requestedBy: "You",
      votes: 0,
    };
    setSongRequests([newRequest, ...songRequests]);
  };

  const handleVote = (requestId: string) => {
    setSongRequests(
      songRequests.map((req) =>
        req.id === requestId
          ? { ...req, votes: req.votes + 1 }
          : req,
      ),
    );
  };

  const handlePollVote = (optionIndex: number) => {
    console.log(`Voted for option ${optionIndex}`);
  };

  return (
    <div className="size-full bg-[#1e1f22] overflow-hidden">
      <div className="h-full flex flex-col">
        <header className="bg-[#313338] border-b border-[#1e1f22] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#5865f2] p-2 rounded-lg">
              <Radio className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                D-Cord Live Radio Station
              </h1>
              <p className="text-sm text-gray-400">
                Live 24/7 • Connect with music lovers worldwide
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_380px_320px] gap-6 p-6">
            <div className="flex flex-col gap-6 overflow-auto">
              <RadioPlayer
                streamUrl="https://example.com/stream"
                isLive={true}
              />
              <LiveVideoFeed
                streamUrl="https://example.com/video-stream"
                djName={currentDj.name}
                viewerCount={listeners}
                isLive={true}
              />
              <NowPlaying song={currentSong} dj={currentDj} />
              <div className="lg:hidden">
                <ActivityPanel
                  listeners={listeners}
                  songRequests={songRequests}
                  currentPoll={currentPoll}
                  onRequestSong={handleRequestSong}
                  onVote={handleVote}
                  onPollVote={handlePollVote}
                />
              </div>
            </div>

            <div className="hidden lg:block overflow-auto">
              <ChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>

            <div className="hidden lg:block overflow-auto">
              <ActivityPanel
                listeners={listeners}
                songRequests={songRequests}
                currentPoll={currentPoll}
                onRequestSong={handleRequestSong}
                onVote={handleVote}
                onPollVote={handlePollVote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}