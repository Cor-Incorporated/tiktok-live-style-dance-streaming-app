
import { useState, useEffect, useCallback } from 'react';
import type { ScorePoint, EmotionData, DonationPoint, CommentStats, Advice } from '../types';
import { advicePool } from '../data/mockAdvice';

const MAX_SCORE_POINTS = 12; // 60 seconds / 5s interval
const MAX_DONATION_POINTS = 4; // 2 minutes / 30s interval

export const useStreamData = (isActive: boolean) => {
    const [scoreData, setScoreData] = useState<ScorePoint[]>([{ timestamp: Date.now(), score: 75 }]);
    const [emotionData, setEmotionData] = useState<EmotionData>({ positive: 85, neutral: 10, negative: 5 });
    const [donationData, setDonationData] = useState<DonationPoint[]>(() => Array(MAX_DONATION_POINTS).fill({ timestamp: 0, amount100: 0, amount500: 0, amount1000: 0 }));
    const [commentStats, setCommentStats] = useState<CommentStats>({ total: 0, perMinute: 0, positiveRate: 85 });
    const [currentAdvice, setCurrentAdvice] = useState<Advice>(advicePool[0]);
    const [totalDonations, setTotalDonations] = useState(0);

    // Score updater
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setScoreData(prev => {
                const lastScore = prev[prev.length - 1]?.score ?? 75;
                const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
                const newScore = Math.max(0, Math.min(100, lastScore + change));
                const updated = [...prev, { timestamp: Date.now(), score: newScore }];
                return updated.slice(-MAX_SCORE_POINTS);
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [isActive]);
    
    // Emotion updater
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setEmotionData(() => {
                const positive = Math.floor(Math.random() * 20) + 75; // 75-95
                const negative = Math.floor(Math.random() * 5) + 1; // 1-6
                const neutral = 100 - positive - negative;
                return { positive, neutral, negative };
            });
        }, 10000);
        return () => clearInterval(interval);
    }, [isActive]);

    // Donation data window shifter
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setDonationData(prev => {
                 const updated = [...prev, { timestamp: Date.now(), amount100: 0, amount500: 0, amount1000: 0 }];
                 return updated.slice(-MAX_DONATION_POINTS);
            });
        }, 30000);
        return () => clearInterval(interval);
    }, [isActive]);


    // Comment stats updater
    useEffect(() => {
        if (!isActive) return;
        let total = 0;
        const interval = setInterval(() => {
            const newComments = Math.floor(Math.random() * 5);
            total += newComments;
            setCommentStats(prev => ({
                total: prev.total + newComments,
                perMinute: Math.floor(Math.random() * 10) + 5,
                positiveRate: Math.floor(Math.random() * 10) + 85
            }));
        }, 7000);
        return () => clearInterval(interval);
    }, [isActive]);
    
    // Advice updater
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setCurrentAdvice(advicePool[Math.floor(Math.random() * advicePool.length)]);
        }, 15000);
        return () => clearInterval(interval);
    }, [isActive]);

    // Simulate receiving donations
     useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            const random = Math.random();
            if (random < 0.1) { // 10% chance per 8 seconds
                const amounts = [100, 500, 1000];
                const amount = amounts[Math.floor(Math.random() * amounts.length)] as 100 | 500 | 1000;
                
                setTotalDonations(prev => prev + amount);
                setDonationData(prev => {
                    const last = prev[prev.length-1];
                    if (!last) return prev;
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...last,
                        [`amount${amount}`]: last[`amount${amount}`] + 1
                    };
                    return updated;
                });

                setScoreData(prev => {
                    const last = prev[prev.length - 1];
                     if (!last) return prev;
                    const bonus = amount === 100 ? 5 : amount === 500 ? 15 : 30;
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...last,
                        score: Math.min(100, last.score + bonus)
                    };
                    return updated;
                });

            }
        }, 8000);
        return () => clearInterval(interval);
    }, [isActive]);


    return { scoreData, emotionData, donationData, commentStats, currentAdvice, totalDonations };
};
