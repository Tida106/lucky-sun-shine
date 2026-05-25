import { site } from '@/lib/site';
import OmikujiClient from './OmikujiClient';
import Breadcrumbs from '@/components/Breadcrumbs';

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
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ name: '太陽ちゃんのおみくじ' }]} />
      </div>
      <OmikujiClient />
    </>
  );
}
