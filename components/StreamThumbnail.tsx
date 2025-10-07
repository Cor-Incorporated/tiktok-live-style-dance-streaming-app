
import React from 'react';
import { motion } from 'framer-motion';
import type { StreamData } from '../types';

interface StreamThumbnailProps {
  stream: StreamData;
  onClick: (id: string) => void;
}

const StreamThumbnail: React.FC<StreamThumbnailProps> = ({ stream, onClick }) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={() => onClick(stream.id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={stream.thumbnail} alt={stream.title} className="w-full h-64 object-cover rounded-lg shadow-lg" />
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        LIVE
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
        <p className="text-white font-bold text-sm truncate">{stream.title}</p>
        <p className="text-gray-300 text-xs">👁️ {stream.viewerCount} viewers</p>
      </div>
    </motion.div>
  );
};

export default StreamThumbnail;
