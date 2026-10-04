import { site } from '@/lib/site';
import OmikujiClient from '../../omikuji/OmikujiClient';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: '太陽醬的抽籤☀️｜Lucky Sun Shine',
  description:
    '太陽醬要為今天的你,帶來運勢與幸運石。可以抽無限多次,當作每天轉換心情的小儀式☀️',
  alternates: {
    canonical: '/zh-tw/omikuji/',
    languages: {
      ja: '/omikuji/',
      en: '/en/omikuji/',
      'zh-Hant-TW': '/zh-tw/omikuji/',
      'x-default': '/omikuji/',
    },
  },
  openGraph: {
    title: '太陽醬的抽籤☀️',
    description: '太陽醬要為今天的你,帶來運勢與幸運石。',
    url: `${site.url}/zh-tw/omikuji/`,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: '太陽醬的抽籤 | Lucky Sun Shine',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function ZhTwOmikujiPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ name: '太陽醬的抽籤' }]} locale="zh-tw" />
      </div>
      <OmikujiClient />
    </>
  );
}
