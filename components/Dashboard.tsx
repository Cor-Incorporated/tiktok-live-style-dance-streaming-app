
import React from 'react';
import { mockStreams } from '../data/mockStreams';
import StreamThumbnail from './StreamThumbnail';

interface DashboardProps {
  onStartStream: () => void;
  onSelectStream: (id: string) => void;
  onGoToMyPage: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartStream, onSelectStream, onGoToMyPage }) => {
  return (
    <div className="h-full bg-black text-white flex flex-col font-sans">
      <header className="p-3 sm:p-4 flex justify-between items-center flex-shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold">ライブ配信中</h1>
        <button onClick={onGoToMyPage} className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center text-lg sm:text-xl">
          👤
        </button>
      </header>
      
      <main className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {mockStreams.map(stream => (
            <StreamThumbnail key={stream.id} stream={stream} onClick={onSelectStream} />
          ))}
        </div>
      </main>

      <footer className="p-3 sm:p-4 flex-shrink-0">
        <button 
          onClick={onStartStream}
          className="w-full h-12 sm:h-14 bg-[#FF3B5C] rounded-full text-white text-base sm:text-lg font-bold shadow-lg transform active:scale-95 transition-transform"
        >
          配信開始
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
