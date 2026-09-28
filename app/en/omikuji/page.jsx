import { site } from '@/lib/site';
import OmikujiClient from '../../omikuji/OmikujiClient';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: "Sun-chan's Fortune ☀️ | Lucky Sun Shine",
  description:
    "Sun-chan delivers today's fortune and a lucky power stone. Draw as many times as you like and brighten your day ☀️",
  alternates: {
    canonical: '/en/omikuji/',
    languages: { ja: '/omikuji/', en: '/en/omikuji/' },
  },
  openGraph: {
    title: "Sun-chan's Fortune ☀️",
    description: "Sun-chan delivers today's fortune and a lucky power stone.",
    url: `${site.url}/en/omikuji/`,
    images: [
      {
        url: `${site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Sun-chan's Fortune | Lucky Sun Shine",
        type: 'image/jpeg',
      },
    ],
  },
};

export default function EnOmikujiPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Breadcrumbs items={[{ name: "Sun-chan's Fortune" }]} />
      </div>
      <OmikujiClient />
    </>
  );
}