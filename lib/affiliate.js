// ステマ規制（景品表示法の「一般消費者が事業者の表示であることを判別することが
// 困難である表示」規制）対応の共通ユーティリティ。
// アフィリエイトリンクを出す全コンポーネントで、ロケールに応じた
// 「PR」表記を統一的に表示するために使う。
export const PR_LABELS = {
  ja: 'PR',
  en: 'Ad',
  'zh-tw': '廣告',
};

export function prLabel(locale = 'ja') {
  return PR_LABELS[locale] || PR_LABELS.ja;
}

// 記事がアフィリエイトリンクを含むかどうかを、本文Markdown・frontmatter から
// 判定する。記事上部に「この記事にはプロモーションが含まれています」の
// 注記を出すかどうかの判定に使う。
// - 本文中の `rel="sponsored"` 付きリンク（CLAUDE.md で定めた記事内アフィリ
//   エイトリンクの標準形）
// - Amazon/楽天/もしも の擬似コンポーネントタグ（将来、本文内で実際に
//   使われる場合に備えて検出対象に含める）
// - frontmatter の viatorSpots（英語版パワースポット記事のViatorツアーリンク）
// - 日本語版パワースポット記事専用の電話占いCTA（page.jsx側で無条件表示）
const AFFILIATE_CONTENT_RE = /rel="sponsored|<AmazonLink|<RakutenLink|<MoshimoLink|<ProductRow|<RakutenApi|<RelatedProducts/i;

export function postHasAffiliateLinks(post, locale = 'ja') {
  if (!post) return false;
  if (AFFILIATE_CONTENT_RE.test(post.content || '')) return true;
  if (Array.isArray(post.viatorSpots) && post.viatorSpots.length > 0) return true;
  // 日本語版のみ、パワースポット記事に電話占いデスティニーのCTAを無条件表示
  if (locale === 'ja' && (post.category === 'powerspots' || post.category === 'powerspot')) {
    return true;
  }
  return false;
}
