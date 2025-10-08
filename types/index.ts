
// App State Types
export type AppMode = 'dashboard' | 'streamer' | 'viewer' | 'mypage';

// Stream Types
export interface StreamData {
  id: string;
  title: string;
  thumbnail: string;
  viewerCount: number;
  isLive: boolean;
}

// Analytics Types
export interface ScorePoint {
  timestamp: number;
  score: number;
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

// Comment Types
export type EmotionType = 'positive' | 'neutral' | 'negative';

export interface Comment {
  id: string;
  username: string;
  text: string;
  emotion: EmotionType;
}

// AI Advice Types
export type AdviceLevel = 'normal' | 'warning' | 'danger';

export interface Advice {
  evaluation: string;
  action: string;
  level?: AdviceLevel;
  managerNote?: string; // マネージャーとしての追加指示
}

// Component Props Types
export interface StreamerModeProps {
  onStop: () => void;
  onGoToMyPage: () => void;
}

export interface ViewerModeProps {
  streamId: string;
  onExit: () => void;
  onNextStream?: (streamId: string) => void;
}

export interface DashboardProps {
  onStartStream: () => void;
  onSelectStream: (id: string) => void;
  onGoToMyPage: () => void;
}

export interface MyPageProps {
  onBack: () => void;
}

// Chart Component Props
export interface ScoreChartProps {
  data: ScorePoint[];
}

export interface EmotionChartProps {
  data: EmotionData;
}

export interface DonationChartProps {
  data: DonationPoint[];
}

export interface CommentStatsProps {
  stats: CommentStats;
}

export interface ActionAdviceProps {
  advice: Advice;
}

export interface CommentPopupProps {
  comment: Comment;
}

export interface StreamThumbnailProps {
  stream: StreamData;
  onClick: (id: string) => void;
}

export interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: 100 | 500 | 1000) => void;
}
