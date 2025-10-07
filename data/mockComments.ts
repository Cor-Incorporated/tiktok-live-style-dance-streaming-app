
import type { Comment } from '../types';

export const mockComments: Omit<Comment, 'id'>[] = [
    { username: "Taro", text: "すごい！", emotion: 'positive' },
    { username: "Hana", text: "かっこいい！", emotion: 'positive' },
    { username: "Kenji", text: "もっと見たい", emotion: 'positive' },
    { username: "Yuki", text: "なるほど", emotion: 'neutral' },
    { username: "Emi", text: "キレキレ！", emotion: 'positive' },
    { username: "Ryo", text: "最高！", emotion: 'positive' },
    { username: "Miki", text: "うまい", emotion: 'positive' },
    { username: "Daiki", text: "ふむ", emotion: 'neutral' },
    { username: "Saki", text: "ちょっと速いかも", emotion: 'negative' },
];
