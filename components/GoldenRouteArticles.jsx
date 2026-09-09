import Link from 'next/link';
import CategoryIcon from './CategoryIcon';

// GA4データから抽出した「滞在時間が長く、ファン化しやすい」エース記事たち
const RECOMMENDED_POSTS = [
  {
    title: 'つけてはいけないパワーストーンの組み合わせは本当にある？',
    slug: 'bad-combination-stones',
    category: 'powerstones',
    excerpt: '「NG」と言われる組み合わせの真相と、石同士の相性について徹底解説します。',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: '玄関に置くと良いパワーストーン完全ガイド',
    slug: 'genkan-powerstone-guide',
    category: 'powerspots', 
    excerpt: '運気の入り口である玄関。目的別の選び方や正しい置き方、お手入れ方法まで。',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: '方角別パワーストーン早見表 | 風水の八方位×五行',
    slug: 'fengshui-direction-stones',
    category: 'luck-habits',
    excerpt: '家の中のどの方角に、どの石を置けば運気がアップするのか？風水視点で解説。',
    color: 'bg-green-50 text-green-600',
  },
  {
    title: '12星座の守護石・誕生石早見表',
    slug: 'zodiac-guardian-stone-chart',
    category: 'powerstones',
    excerpt: 'あなたの星座が持つ守護石は？占星術と結びついたお守り石を見つけましょう。',
    color: 'bg-blue-50 text-blue-600',
  }
];

export default function GoldenRouteArticles() {
  return (
    <section className="mt-16 mb-8 p-6 sm:p-8 bg-gradient-to-br from-amber-100/40 to-orange-50/40 rounded-3xl border border-amber-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl drop-shadow-sm">✨</span>
        <h3 className="text-lg sm:text-xl font-bold text-amber-800">
          あわせて読みたい！人気の開運ガイド
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RECOMMENDED_POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            <div className="h-full p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* 左側の可愛いアイコンバッジ（先ほど直した安全なCategoryIconを使用！） */}
                <div className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${post.color}`}>
                  <CategoryIcon slug={post.category} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                {/* 右側のテキストエリア */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="mt-1.5 text-[11px] sm:text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}