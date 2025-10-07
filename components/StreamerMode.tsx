import React from 'react';
import { useStreamData } from '../hooks/useStreamData';
import type { StreamerModeProps } from '../types';
import ActionAdvice from './ActionAdvice';
import CommentStats from './CommentStats';
import DonationChart from './DonationChart';
import EmotionChart from './EmotionChart';
import ScoreChart from './ScoreChart';
import WebcamView from './WebcamView';

const StreamerMode: React.FC<StreamerModeProps> = ({ onStop, onGoToMyPage }) => {
    const { scoreData, emotionData, donationData, commentStats, currentAdvice, totalDonations } = useStreamData(true);

  return (
    <div className="h-full bg-black text-white flex flex-col md:flex-row">
      {/* カメラビュー - 小さい画面では上半分、大きい画面では左半分 */}
      <div className="relative w-full h-1/2 md:w-1/2 md:h-full flex-shrink-0">
        <WebcamView />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent p-2 md:p-4 flex justify-between items-start">
            <button 
              onClick={onStop} 
              className="bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-xs md:text-sm"
            >
              配信終了
            </button>
            <div className="flex items-start gap-1 md:gap-2">
                <div className="bg-black/50 p-1.5 md:p-2 rounded-lg flex items-center space-x-1 md:space-x-2 text-[10px] md:text-xs">
                    <div className="text-red-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>LIVE</div>
                    <div>|</div>
                    <div>👁️ 18</div>
                    <div>|</div>
                    <div className="text-yellow-400">¥{totalDonations.toLocaleString()}</div>
                </div>
                <button onClick={onGoToMyPage} className="w-8 h-8 md:w-10 md:h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-lg md:text-xl backdrop-blur-sm shrink-0">
                    👤
                </button>
            </div>
        </div>
      </div>
      
      {/* AI分析画面 - 小さい画面では下半分、大きい画面では右半分、スクロール可能 */}
      <div className="w-full h-1/2 md:w-1/2 md:h-full bg-black p-1.5 md:p-2 overflow-y-auto flex flex-col gap-1.5 md:gap-2">
        <div className="grid grid-cols-2 gap-1.5 md:gap-2 flex-shrink-0">
          <ScoreChart data={scoreData} />
          <EmotionChart data={emotionData} />
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 md:gap-2 flex-shrink-0">
          <DonationChart data={donationData} />
          <CommentStats stats={commentStats} />
        </div>
        
        <div className="flex-shrink-0">
          <ActionAdvice advice={currentAdvice} />
        </div>
      </div>
    </div>
  );
};

export default StreamerMode;