
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { ActionAdviceProps } from '../types';

const ActionAdvice: React.FC<ActionAdviceProps> = ({ advice }) => {
  // レベルに応じた背景色とボーダー色
  const getBgColor = () => {
    switch (advice.level) {
      case 'danger':
        return 'from-red-900/90 to-red-800/90 border-2 border-red-500';
      case 'warning':
        return 'from-yellow-900/90 to-yellow-800/90 border-2 border-yellow-500';
      default:
        return 'from-gray-900/80 to-gray-800/80';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getBgColor()} backdrop-blur-sm rounded-lg p-2 sm:p-3 flex flex-col justify-center h-full min-h-[60px]`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={advice.evaluation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col justify-center space-y-1"
        >
          {/* レベルインジケーター */}
          {advice.level && advice.level !== 'normal' && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 w-fit ${
                advice.level === 'danger' 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-yellow-500 text-black'
              }`}
            >
              {advice.level === 'danger' ? '🚨 緊急' : '⚠️ 警告'}
            </motion.div>
          )}
          
          {/* 評価 */}
          <div className={`text-xs sm:text-sm mb-0.5 sm:mb-1 ${
            advice.level === 'danger' ? 'text-red-200 font-bold' :
            advice.level === 'warning' ? 'text-yellow-200 font-semibold' :
            'text-gray-300'
          }`}>
            評価: {advice.evaluation}
          </div>
          
          {/* 提案 */}
          <div className="text-sm sm:text-base text-white font-bold">
            提案: {advice.action}
          </div>
          
          {/* マネージャーからの指示 */}
          {advice.managerNote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-1 pt-1 border-t border-gray-600/50"
            >
              <div className="text-[10px] sm:text-xs text-blue-300 font-medium mb-0.5">
                💼 マネージャーより:
              </div>
              <div className="text-[10px] sm:text-xs text-gray-200">
                {advice.managerNote}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ActionAdvice;
