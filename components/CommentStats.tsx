
import React from 'react';
import type { CommentStatsProps } from '../types';

const CommentStats: React.FC<CommentStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 h-full min-h-[100px] flex flex-col justify-around">
       <div className="text-left mb-1 sm:mb-2">
        <h3 className="text-[10px] sm:text-xs text-white font-bold">コメント統計</h3>
      </div>
      <div className="text-center">
        <div className="text-[10px] sm:text-xs text-gray-400">総コメント</div>
        <div className="text-xl sm:text-2xl font-bold text-white">{stats.total}</div>
      </div>
      <div className="flex justify-around text-center">
        <div>
          <div className="text-[10px] sm:text-xs text-gray-400">コメ/分</div>
          <div className="text-base sm:text-lg font-semibold text-blue-400">{stats.perMinute}</div>
        </div>
        <div>
          <div className="text-[10px] sm:text-xs text-gray-400">ポジ率</div>
          <div className="text-base sm:text-lg font-semibold text-green-400">{stats.positiveRate}%</div>
        </div>
      </div>
    </div>
  );
};

export default CommentStats;
