import CategoryListing, {
  buildCategoryMetadata,
  localizedCategoryParams,
} from '@/components/CategoryListing';

const LOCALE = 'en';

// 英語の翻訳記事が1件以上あるカテゴリだけ生成する。
export function generateStaticParams() {
  return localizedCategoryParams(LOCALE);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildCategoryMetadata(slug, LOCALE);
}

export default async function CategoryPageEn({ params }) {
  const { slug } = await params;
  return <CategoryListing slug={slug} locale={LOCALE} />;
}
