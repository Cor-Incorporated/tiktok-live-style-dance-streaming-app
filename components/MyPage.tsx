
import React from 'react';
import { motion } from 'framer-motion';

interface MyPageProps {
  onBack: () => void;
}

const MyPage: React.FC<MyPageProps> = ({ onBack }) => {
  const stats = {
    totalDonations: 5500,
    avgScore: 88,
    totalStreams: 3,
  };

  const pastStreams = [
    { id: '1', title: 'ヒップホップ練習', score: 88, donations: 1500, date: '2025-10-05' },
    { id: '2', title: 'K-POPチャレンジ', score: 92, donations: 3200, date: '2025-10-03' },
    { id: '3', title: 'フリースタイル', score: 85, donations: 800, date: '2025-10-01' },
  ];

  return (
    <div className="h-full bg-black text-white flex flex-col">
      <header className="flex-shrink-0 flex items-center p-4 bg-gray-900 sticky top-0 z-10">
        <button onClick={onBack} className="mr-4 text-2xl">
          ‹
        </button>
        <h1 className="text-xl font-bold">マイページ</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-4xl shadow-lg">
            👤
          </div>
          <h2 className="text-xl font-bold">ダンサー太郎</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">
              ¥{stats.totalDonations.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">総投げ銭</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.avgScore}</div>
            <div className="text-xs text-gray-400 mt-1">平均スコア</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.totalStreams}</div>
            <div className="text-xs text-gray-400 mt-1">総配信数</div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold mb-3">過去の配信</h3>
          <div className="space-y-3">
            {pastStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg p-4"
              >
                <h4 className="font-semibold text-white mb-2">{stream.title}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400">スコア: {stream.score}</span>
                  <span className="text-yellow-500">¥{stream.donations.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{stream.date}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
