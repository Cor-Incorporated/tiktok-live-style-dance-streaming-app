
import { useCallback, useEffect, useState } from 'react';
import { dangerAdvicePool, normalAdvicePool, warningAdvicePool } from '../data/mockAdvice';
import type { Advice, CommentStats, DonationPoint, EmotionData, ScorePoint } from '../types';

const MAX_SCORE_POINTS = 12; // 60 seconds / 5s interval
const MAX_DONATION_POINTS = 4; // 2 minutes / 30s interval

export const useStreamData = (isActive: boolean) => {
    const [scoreData, setScoreData] = useState<ScorePoint[]>([{ timestamp: Date.now(), score: 75 }]);
    const [emotionData, setEmotionData] = useState<EmotionData>({ positive: 85, neutral: 10, negative: 5 });
    const [donationData, setDonationData] = useState<DonationPoint[]>(() => Array(MAX_DONATION_POINTS).fill({ timestamp: 0, amount100: 0, amount500: 0, amount1000: 0 }));
    const [commentStats, setCommentStats] = useState<CommentStats>({ total: 0, perMinute: 0, positiveRate: 85 });
    const [currentAdvice, setCurrentAdvice] = useState<Advice>(normalAdvicePool[0]);
    const [totalDonations, setTotalDonations] = useState(0);
    const [previousScore, setPreviousScore] = useState(75);

    // 炎上レベルを判定する関数
    const detectCrisisLevel = useCallback(() => {
        const currentScore = scoreData[scoreData.length - 1]?.score ?? 75;
        const scoreDrop = previousScore - currentScore;
        const negativeRate = 100 - commentStats.positiveRate;

        // 危機レベル：複数の危険指標が重なっている
        if (negativeRate >= 50 || currentScore <= 30 || scoreDrop >= 30) {
            return 'danger';
        }
        
        // 警告レベル：いくつかの警告指標がある
        if (negativeRate >= 25 || scoreDrop >= 15 || currentScore <= 50) {
            return 'warning';
        }

        // 通常レベル
        return 'normal';
    }, [scoreData, commentStats.positiveRate, previousScore]);

    // Score updater
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            setScoreData(prev => {
                const lastScore = prev[prev.length - 1]?.score ?? 75;
                setPreviousScore(lastScore); // 前回のスコアを保存
                
                // ランダムに炎上シミュレーション（10%の確率で大幅下落）
                let change: number;
                const random = Math.random();
                if (random < 0.05) {
                    // 5%の確率で大幅下落（炎上シミュレーション）
                    change = Math.floor(Math.random() * 20) - 25; // -25 to -5
                } else if (random < 0.1) {
                    // 5%の確率で中程度の下落
                    change = Math.floor(Math.random() * 10) - 15; // -15 to -5
                } else {
                    // 通常の変動
                    change = Math.floor(Math.random() * 7) - 3; // -3 to +3
                }
                
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
                const random = Math.random();
                let positive: number, negative: number;
                
                if (random < 0.05) {
                    // 5%の確率で炎上状態（ネガティブ急増）
                    negative = Math.floor(Math.random() * 20) + 40; // 40-60
                    positive = Math.floor(Math.random() * 20) + 20; // 20-40
                } else if (random < 0.1) {
                    // 5%の確率で警告状態
                    negative = Math.floor(Math.random() * 15) + 20; // 20-35
                    positive = Math.floor(Math.random() * 20) + 50; // 50-70
                } else {
                    // 通常状態
                    positive = Math.floor(Math.random() * 20) + 75; // 75-95
                    negative = Math.floor(Math.random() * 5) + 1; // 1-6
                }
                
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
            
            const random = Math.random();
            let positiveRate: number;
            
            if (random < 0.05) {
                // 5%の確率で炎上状態
                positiveRate = Math.floor(Math.random() * 20) + 30; // 30-50
            } else if (random < 0.1) {
                // 5%の確率で警告状態
                positiveRate = Math.floor(Math.random() * 15) + 60; // 60-75
            } else {
                // 通常状態
                positiveRate = Math.floor(Math.random() * 10) + 85; // 85-95
            }
            
            setCommentStats(prev => ({
                total: prev.total + newComments,
                perMinute: Math.floor(Math.random() * 10) + 5,
                positiveRate
            }));
        }, 7000);
        return () => clearInterval(interval);
    }, [isActive]);
    
    // Advice updater - 炎上レベルに応じてアドバイスを選択
    useEffect(() => {
        if (!isActive) return;
        
        const updateAdvice = () => {
            const crisisLevel = detectCrisisLevel();
            let selectedPool: Advice[];
            
            switch (crisisLevel) {
                case 'danger':
                    selectedPool = dangerAdvicePool;
                    break;
                case 'warning':
                    selectedPool = warningAdvicePool;
                    break;
                default:
                    selectedPool = normalAdvicePool;
            }
            
            const randomAdvice = selectedPool[Math.floor(Math.random() * selectedPool.length)];
            setCurrentAdvice(randomAdvice);
        };
        
        updateAdvice(); // 初回実行
        const interval = setInterval(updateAdvice, 15000);
        return () => clearInterval(interval);
    }, [isActive, detectCrisisLevel]);

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
