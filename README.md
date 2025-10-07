<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# TikTok風 ダンスライブ配信アプリ

AIによるリアルタイム分析機能を備えた、TikTok風のライブ配信アプリです。

View your app in AI Studio: https://ai.studio/apps/drive/16ODlkcvEsiFVKr7olTZ28pVXCOEEGE-B

## 主な機能

- 📱 **レスポンシブデザイン**: 様々なスマホサイズに対応
- 🔄 **自動レイアウト切替**: 縦画面・横画面で最適なレイアウトに自動切替
- 📊 **リアルタイム分析**: スコア、感情分析、投げ銭、コメント統計を表示
- 🎥 **配信者モード**: カメラとAI分析を同時表示
- 👀 **視聴者モード**: TikTok風のフルスクリーン視聴体験
- 💬 **コメント機能**: リアルタイムコメント表示
- 💰 **投げ銭機能**: 簡単な投げ銭システム

## レイアウト

### 配信者モード

**縦画面** (Portrait)
```
┌─────────────┐
│   カメラ     │  ← 上半分
├─────────────┤
│ AI分析画面   │  ← 下半分（スクロール可能）
│  - Score    │
│  - 感情分析  │
│  - 投げ銭   │
│  - コメント  │
│  - アドバイス│
└─────────────┘
```

**横画面** (Landscape)
```
┌──────────┬──────────┐
│          │ AI分析   │
│  カメラ   │  画面    │
│          │（スクロー │
│          │ ル可能） │
└──────────┴──────────┘
   ← 左半分   右半分 →
```

## ローカルで実行

**必要なもの:**  Node.js

1. 依存関係をインストール:
   ```bash
   npm install
   ```

2. Gemini APIキーを設定（オプション）:
   `.env.local` に `GEMINI_API_KEY` を設定

3. アプリを起動:
   ```bash
   npm run dev
   ```

4. ブラウザで開く:
   ```
   http://localhost:3000
   ```

## レスポンシブデザインのテスト

詳細なテスト手順は [RESPONSIVE_TEST_GUIDE.md](./RESPONSIVE_TEST_GUIDE.md) を参照してください。

### クイックテスト

1. **デスクトップブラウザ**:
   - 開発者ツール (F12) を開く
   - デバイスツールバー (Ctrl+Shift+M) を有効化
   - iPhone SE、iPhone 12 Pro など様々なデバイスでテスト
   - 縦横回転をテスト

2. **実機テスト**:
   - 同じWi-Fiネットワークでスマホからアクセス
   - 縦画面と横画面で配信画面を確認

## 技術スタック

- **React 19** - UIフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング（レスポンシブデザイン対応）
- **Framer Motion** - アニメーション
- **Chart.js** - データビジュアライゼーション
- **Vite** - ビルドツール

## 対応画面サイズ

- ✅ 小型スマホ (iPhone SE: 375×667px)
- ✅ 標準スマホ (iPhone 12 Pro: 390×844px)
- ✅ 大型スマホ (iPhone 14 Pro Max: 430×932px)
- ✅ 縦画面 (Portrait)
- ✅ 横画面 (Landscape)

## プロジェクト構成

```
tiktok-live-style-dance-streaming-app/
├── components/         # Reactコンポーネント
│   ├── StreamerMode.tsx      # 配信者画面（レスポンシブ対応）
│   ├── ViewerMode.tsx        # 視聴者画面
│   ├── Dashboard.tsx         # ダッシュボード
│   ├── WebcamView.tsx        # カメラビュー
│   ├── ScoreChart.tsx        # スコアチャート
│   ├── EmotionChart.tsx      # 感情分析チャート
│   ├── DonationChart.tsx     # 投げ銭チャート
│   ├── CommentStats.tsx      # コメント統計
│   └── ActionAdvice.tsx      # アクションアドバイス
├── hooks/              # カスタムフック
├── data/               # モックデータ
├── types/              # TypeScript型定義
└── App.tsx             # メインアプリ
```
