
import type { Advice } from '../types';

// 通常のアドバイス
export const normalAdvicePool: Advice[] = [
  {
    evaluation: '視聴者の反応が絶好調！ポジティブ率90%',
    action: '💡 投げ銭呼びかけのベストタイミング！',
    level: 'normal',
    managerNote: '📊 この勢いを活かして、特別なパフォーマンスを披露しましょう',
  },
  {
    evaluation: 'コメントが減少傾向...',
    action: '💬 視聴者に質問を投げかけよう',
    level: 'normal',
    managerNote: '🎯 エンゲージメント向上のため、視聴者参加型の企画を提案してください',
  },
  {
    evaluation: '感情分析：興奮度MAX！',
    action: '🔥 このテンションを維持して！',
    level: 'normal',
    managerNote: '✨ 絶好調です！この流れを最低10分は継続しましょう',
  },
  {
    evaluation: '投げ銭が増加中📈',
    action: '🙏 感謝の気持ちを伝えよう',
    level: 'normal',
    managerNote: '💝 一人一人の名前を読み上げて、しっかり感謝を伝えてください',
  },
  {
    evaluation: 'スコアが安定してきた',
    action: '🎯 新しい技を試すチャンス！',
    level: 'normal',
    managerNote: '🚀 準備していた新ネタを披露して、差別化を図りましょう',
  },
  {
    evaluation: '視聴者エンゲージメント上昇中',
    action: '🔥 もっとアピールしよう！',
    level: 'normal',
    managerNote: '📈 今がピーク！最高のパフォーマンスを見せるタイミングです',
  },
];

// 炎上警告アドバイス
export const warningAdvicePool: Advice[] = [
  {
    evaluation: '⚠️ ネガティブコメント率が上昇中（15%→25%）',
    action: '🛡️ 落ち着いて！笑顔を保って冷静に対応',
    level: 'warning',
    managerNote: '🎭 【重要】表情管理を徹底。動揺を見せず、ポジティブな話題に切り替えてください',
  },
  {
    evaluation: '⚠️ スコアが急激に低下中（-15pt）',
    action: '📉 パフォーマンスを一旦リセット！安全な定番ネタへ',
    level: 'warning',
    managerNote: '🔄 リスク回避を優先。視聴者が好評だった過去のネタに戻しましょう',
  },
  {
    evaluation: '⚠️ コメント欄が荒れ始めています',
    action: '😊 明るい話題で話を変えよう！論争には触れない',
    level: 'warning',
    managerNote: '🚨 絶対に反応しないこと。話題を180度変えて、楽しい雰囲気を作り直してください',
  },
  {
    evaluation: '⚠️ 視聴者数が急減中（-30%）',
    action: '💥 インパクトのある企画で注目を集めよう',
    level: 'warning',
    managerNote: '⏰ 今後5分が勝負。サプライズ企画や特典発表で視聴者を引き止めましょう',
  },
];

// 炎上危機アドバイス
export const dangerAdvicePool: Advice[] = [
  {
    evaluation: '🚨 炎上危機！ネガティブ率50%超え',
    action: '🛑 即座に謝罪！誠実な対応を最優先に',
    level: 'danger',
    managerNote: '💼 【緊急指示】今すぐ以下を実行：①深く謝罪 ②問題発言の撤回 ③休憩を挟むことを検討',
  },
  {
    evaluation: '🚨 批判コメントが集中しています',
    action: '🙇 真摯に受け止め、改善を約束する姿勢を',
    level: 'danger',
    managerNote: '⚠️ 【クライシス対応】言い訳は絶対NG。謝罪→反省→具体的な改善案の順で話してください',
  },
  {
    evaluation: '🚨 スコアが危険水域（30pt以下）',
    action: '⏸️ 一旦配信を休憩して立て直すことも検討',
    level: 'danger',
    managerNote: '🆘 【判断必要】状況次第で配信中断も視野に。無理に続けると炎上が拡大する可能性あり',
  },
  {
    evaluation: '🚨 炎上ワードを検知しました',
    action: '❌ 該当トピックには一切触れないこと！',
    level: 'danger',
    managerNote: '🔇 【厳守】政治・宗教・差別的発言は完全スルー。安全な話題のみに限定してください',
  },
  {
    evaluation: '🚨 視聴者離脱が加速中（-50%）',
    action: '🆘 緊急対応：謝罪後、人気コンテンツで巻き返し',
    level: 'danger',
    managerNote: '💪 【最後のチャンス】①誠実な謝罪 ②視聴者が最も喜んだ過去ベスト3のネタを連続投入',
  },
];

// 後方互換性のため
export const advicePool: Advice[] = [...normalAdvicePool];
