
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Comment } from '../types';

interface CommentPopupProps {
  comment: Comment;
}

const CommentPopup: React.FC<CommentPopupProps> = ({ comment }) => {
  const emotionColors: { [key in Comment['emotion']]: string } = {
    positive: 'bg-green-500/80',
    neutral: 'bg-white/80 text-black',
    negative: 'bg-red-500/80',
  };

  const position = useMemo(() => ({
      top: `${Math.random() * 50 + 25}%`, // 25-75%
      left: `${Math.random() * 60 + 10}%`, // 10-70%
  }), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -20, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`absolute ${emotionColors[comment.emotion]} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm`}
      style={{ top: position.top, left: position.left }}
    >
      <span className="font-bold">{comment.username}:</span> {comment.text}
    </motion.div>
  );
};

export default CommentPopup;
