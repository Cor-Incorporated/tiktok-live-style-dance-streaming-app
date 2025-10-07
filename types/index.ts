
export type AppMode = 'dashboard' | 'streamer' | 'viewer' | 'mypage';

export interface StreamData {
  id: string;
  title: string;
  thumbnail: string;
  viewerCount: number;
  isLive: boolean;
}

export interface ScorePoint {
  timestamp: number;
  score: number;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  emotion: 'positive' | 'neutral' | 'negative';
}

export interface EmotionData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface DonationPoint {
  timestamp: number;
  amount100: number;
  amount500: number;
  amount1000: number;
}

export interface CommentStats {
  total: number;
  perMinute: number;
  positiveRate: number;
}

export interface Advice {
  evaluation: string;
  action: string;
}
