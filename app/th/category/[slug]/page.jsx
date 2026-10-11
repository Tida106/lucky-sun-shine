import CategoryListing, {
  buildCategoryMetadata,
  localizedCategoryParams,
} from '@/components/CategoryListing';

const LOCALE = 'th';

// タイ語の翻訳記事が1件以上あるカテゴリだけ生成する(0件のカテゴリは作らない)。
export function generateStaticParams() {
  return localizedCategoryParams(LOCALE);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildCategoryMetadata(slug, LOCALE);
}

export default async function CategoryPageTh({ params }) {
  const { slug } = await params;
  return <CategoryListing slug={slug} locale={LOCALE} />;
}
