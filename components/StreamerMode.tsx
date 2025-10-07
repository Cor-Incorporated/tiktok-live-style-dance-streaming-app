import React, { useEffect, useState } from 'react';
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
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

  return (
    <div 
      className="h-full bg-black text-white flex"
      style={{
        flexDirection: isLandscape ? 'row' : 'column'
      }}
    >
      {/* カメラビュー - 縦画面では上半分、横画面では左半分 */}
      <div 
        className="relative flex-shrink-0"
        style={{
          width: isLandscape ? '50%' : '100%',
          height: isLandscape ? '100%' : '50%'
        }}
      >
        <WebcamView />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent p-2 flex justify-between items-start">
            <button 
              onClick={onStop} 
              className="bg-red-500 text-white px-3 py-1.5 rounded-full font-bold text-xs"
            >
              配信終了
            </button>
            <div className="flex items-start gap-1">
                <div className="bg-black/50 p-1.5 rounded-lg flex items-center space-x-1 text-[10px]">
                    <div className="text-red-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>LIVE</div>
                    <div>|</div>
                    <div>👁️ 18</div>
                    <div>|</div>
                    <div className="text-yellow-400">¥{totalDonations.toLocaleString()}</div>
                </div>
                <button onClick={onGoToMyPage} className="w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-lg backdrop-blur-sm shrink-0">
                    👤
                </button>
            </div>
        </div>
      </div>
      
      {/* AI分析画面 - 縦画面では下半分、横画面では右半分、スクロール可能 */}
      <div 
        className="bg-black p-1.5 overflow-y-auto flex flex-col gap-1.5"
        style={{
          width: isLandscape ? '50%' : '100%',
          height: isLandscape ? '100%' : '50%'
        }}
      >
        <div className="grid grid-cols-2 gap-1.5 flex-shrink-0">
          <ScoreChart data={scoreData} />
          <EmotionChart data={emotionData} />
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 flex-shrink-0">
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