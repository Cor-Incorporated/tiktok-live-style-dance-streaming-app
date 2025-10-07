import { useEffect } from 'react';
import type { Comment } from '../types';
import { mockComments } from '../data/mockComments';

export const useMockComments = (isActive: boolean, addComment: (comment: Comment) => void) => {
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            const randomComment = mockComments[Math.floor(Math.random() * mockComments.length)];
            const newComment: Comment = {
                ...randomComment,
                id: `comment-${Date.now()}-${Math.random()}`,
            };
            addComment(newComment);
        }, 3000 + Math.random() * 2000); // Simulate comments every 3-5 seconds

        return () => clearInterval(interval);
    }, [isActive, addComment]);
};
