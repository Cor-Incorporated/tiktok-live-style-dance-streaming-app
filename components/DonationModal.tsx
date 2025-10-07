
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type DonationAmount = 100 | 500 | 1000;

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: DonationAmount) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onDonate }) => {
  const amounts = [
    { value: 100, label: '¥100', color: 'bg-amber-700', icon: '🥉' },
    { value: 500, label: '¥500', color: 'bg-gray-400', icon: '🥈' },
    { value: 1000, label: '¥1000', color: 'bg-yellow-500', icon: '🥇' },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-900 rounded-t-2xl p-6 w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              💰 投げ銭する
            </h2>
            
            <div className="space-y-4">
              {amounts.map(({ value, label, color, icon }) => (
                <button
                  key={value}
                  onClick={() => {
                    onDonate(value);
                  }}
                  className={`w-full ${color} hover:opacity-90 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95`}
                >
                  <span className="text-2xl">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
            
            <button
              onClick={onClose}
              className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl"
            >
              キャンセル
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;
