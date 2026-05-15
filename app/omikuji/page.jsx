import { site } from '@/lib/site';
import OmikujiClient from './OmikujiClient';

export const metadata = {
  title: '太陽ちゃんのおみくじ☀️｜Lucky Sun Shine',
  description:
    '太陽ちゃんが今日のあなたに、運勢とラッキーストーンをお届けします。何度引いてもOK、毎日の気分転換にどうぞ☀️',
  alternates: { canonical: '/omikuji/' },
  openGraph: {
    title: '太陽ちゃんのおみくじ☀️',
    description:
      '太陽ちゃんが今日のあなたに、運勢とラッキーストーンをお届けします。',
    url: `${site.url}/omikuji/`,
  },
};

export default function OmikujiPage() {
  return <OmikujiClient />;
}
