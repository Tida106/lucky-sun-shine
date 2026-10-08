import CategoryListing, {
  buildCategoryMetadata,
  localizedCategoryParams,
} from '@/components/CategoryListing';

const LOCALE = 'zh-tw';

// 繁體中文の翻訳記事が1件以上あるカテゴリだけ生成する(開運小物は0件のため作らない)。
export function generateStaticParams() {
  return localizedCategoryParams(LOCALE);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return buildCategoryMetadata(slug, LOCALE);
}

export default async function CategoryPageZhTw({ params }) {
  const { slug } = await params;
  return <CategoryListing slug={slug} locale={LOCALE} />;
}
