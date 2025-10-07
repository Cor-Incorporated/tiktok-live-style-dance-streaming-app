
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { ActionAdviceProps } from '../types';

const ActionAdvice: React.FC<ActionAdviceProps> = ({ advice }) => {
  return (
    <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 flex flex-col justify-center h-full min-h-[60px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={advice.evaluation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="h-full flex flex-col justify-center"
        >
          <div className="text-xs sm:text-sm text-gray-300 mb-0.5 sm:mb-1">
            評価: {advice.evaluation}
          </div>
          <div className="text-sm sm:text-base text-white font-bold">
            提案: {advice.action}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ActionAdvice;
