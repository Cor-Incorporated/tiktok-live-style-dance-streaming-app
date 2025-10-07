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
    <div className="h-full bg-black text-white flex flex-col portrait:flex-col landscape:flex-row">
      {/* カメラビュー - 縦画面では上半分、横画面では左半分 */}
      <div className="relative portrait:w-full portrait:h-1/2 landscape:w-1/2 landscape:h-full flex-shrink-0">
        <WebcamView />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent p-2 landscape:p-4 flex justify-between items-start">
            <button 
              onClick={onStop} 
              className="bg-red-500 text-white px-3 py-1.5 landscape:px-4 landscape:py-2 rounded-full font-bold text-xs landscape:text-sm"
            >
              配信終了
            </button>
            <div className="flex items-start gap-1 landscape:gap-2">
                <div className="bg-black/50 p-1.5 landscape:p-2 rounded-lg flex items-center space-x-1 landscape:space-x-2 text-[10px] landscape:text-xs">
                    <div className="text-red-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>LIVE</div>
                    <div>|</div>
                    <div>👁️ 18</div>
                    <div>|</div>
                    <div className="text-yellow-400">¥{totalDonations.toLocaleString()}</div>
                </div>
                <button onClick={onGoToMyPage} className="w-8 h-8 landscape:w-10 landscape:h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-lg landscape:text-xl backdrop-blur-sm shrink-0">
                    👤
                </button>
            </div>
        </div>
      </div>
      
      {/* AI分析画面 - 縦画面では下半分、横画面では右半分、スクロール可能 */}
      <div className="portrait:w-full portrait:h-1/2 landscape:w-1/2 landscape:h-full bg-black p-1.5 landscape:p-2 overflow-y-auto flex flex-col gap-1.5 landscape:gap-2">
        <div className="grid grid-cols-2 gap-1.5 landscape:gap-2 flex-shrink-0">
          <ScoreChart data={scoreData} />
          <EmotionChart data={emotionData} />
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 landscape:gap-2 flex-shrink-0">
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