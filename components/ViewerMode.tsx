
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { extraFeedback } from '../data/mockFeedback';
import { mockStreams } from '../data/mockStreams';
import { useMockComments } from '../hooks/useMockComments';
import type { Comment, ViewerModeProps } from '../types';
import CommentPopup from './CommentPopup';
import DonationModal from './DonationModal';
import WebcamView from './WebcamView';

const ViewerMode: React.FC<ViewerModeProps> = ({ streamId, onExit, onNextStream }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');

  const addComment = useCallback((newComment: Comment) => {
    setComments(prev => [...prev, newComment].slice(-5)); // Keep max 5 comments on screen
  }, []);

  useMockComments(true, addComment);

  const handleSendComment = () => {
    if (commentInput.trim() === '') return;
    const userComment: Comment = {
      id: `comment-user-${Date.now()}`,
      username: 'あなた',
      text: commentInput.trim(),
      emotion: 'positive',
    };
    addComment(userComment);
    setCommentInput('');
  };

  const handleDonate = useCallback((amount: 100 | 500 | 1000) => {
    setIsModalOpen(false);
    setShowCoinAnimation(true);
    setFeedbackMessage(extraFeedback[amount]);
    setTimeout(() => setShowCoinAnimation(false), 1500);
    setTimeout(() => setFeedbackMessage(''), 3000);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientY);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const touchEnd = e.targetTouches[0].clientY;
      const distance = touchStart - touchEnd;
      if (distance > 50) { // Swipe up
          onExit();
          setTouchStart(null);
      } else if (distance < -50 && onNextStream) { // Swipe down
          const currentIndex = mockStreams.findIndex(s => s.id === streamId);
          const nextIndex = (currentIndex + 1) % mockStreams.length;
          onNextStream(mockStreams[nextIndex].id);
          setTouchStart(null);
      }
  };


  return (
    <div 
        className="h-full bg-black text-white relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
    >
        {/* Background Video */}
        <div className="absolute inset-0">
            <WebcamView />
        </div>

        {/* UI Overlay */}
        <div className="relative z-10 h-full flex flex-col bg-transparent">
            <header className="p-2 sm:p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent flex-shrink-0">
                <button onClick={onExit} className="text-xl sm:text-2xl font-bold w-8 text-left">←</button>
                <div className="text-center">
                    <h2 className="font-bold text-sm sm:text-base">{mockStreams.find(s=>s.id === streamId)?.title}</h2>
                    <p className="text-xs sm:text-sm text-gray-300">👁️ {mockStreams.find(s=>s.id === streamId)?.viewerCount}</p>
                </div>
                <div className="w-8"></div>
            </header>

            <main className="flex-1 relative">
                <AnimatePresence>
                  {comments.map(comment => <CommentPopup key={comment.id} comment={comment} />)}
                </AnimatePresence>
            </main>
            
            <AnimatePresence>
                {feedbackMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-11/12 bg-black/70 text-center p-3 rounded-lg text-sm text-yellow-300 pointer-events-none"
                    >
                        {feedbackMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="p-2 sm:p-4 bg-gradient-to-t from-black/60 to-transparent flex-shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="relative flex-grow">
                        <input 
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSendComment(); }}
                            placeholder="コメントする..."
                            className="w-full h-10 sm:h-12 bg-black/50 rounded-full pl-3 sm:pl-4 pr-10 sm:pr-12 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm"
                        />
                        <button
                            onClick={handleSendComment}
                            disabled={!commentInput.trim()}
                            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-9 sm:w-9 bg-yellow-500 rounded-full text-black text-base sm:text-lg font-bold flex items-center justify-center transition-opacity disabled:opacity-50"
                        >
                            ↑
                        </button>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="h-10 w-10 sm:h-12 sm:w-12 bg-[#FFD700] text-black font-bold text-base sm:text-lg rounded-full flex items-center justify-center shrink-0"
                    >
                        💰
                    </button>
                </div>
            </footer>
        </div>

        <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDonate={handleDonate} />

        {showCoinAnimation && (
            <motion.div
                initial={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
                animate={{ y: -400, scale: [1, 1.5, 1], rotate: 720, opacity: [1, 1, 0] }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="fixed bottom-20 left-1/2 -translate-x-1/2 text-6xl z-50 pointer-events-none"
                onAnimationComplete={() => setShowCoinAnimation(false)}
            >
                💰
            </motion.div>
        )}
    </div>
  );
};

export default ViewerMode;
