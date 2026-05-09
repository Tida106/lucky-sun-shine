import { site } from '@/lib/site';

export const metadata = {
  title: 'お問い合わせ',
  description: `${site.name} へのお問い合わせはこちらから。記事内容のご指摘・取材依頼・広告掲載等のご相談を受け付けています。`,
  alternates: { canonical: '/contact/' },
};

// Formspree endpoint — set NEXT_PUBLIC_FORMSPREE_ID in env to override.
// The placeholder ID is replaced once the production form is created.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xpwadkva';
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">お問い合わせ</h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        記事内容のご指摘・取材依頼・広告掲載・コラボのご相談など、お気軽にお問い合わせください。
        通常2〜5営業日以内にご返信いたします。
      </p>

      <form
        action={FORMSPREE_ENDPOINT}
        method="POST"
        className="mt-8 p-6 rounded-2xl bg-white border border-amber-200 space-y-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-ink-900 mb-1">
            お名前 <span className="text-amber-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full px-3 py-2 rounded border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none bg-amber-50/40"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-ink-900 mb-1">
            メールアドレス <span className="text-amber-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 rounded border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none bg-amber-50/40"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-ink-900 mb-1">
            件名
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full px-3 py-2 rounded border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none bg-amber-50/40"
            defaultValue=""
          >
            <option value="" disabled>選択してください</option>
            <option>記事内容のご指摘・修正依頼</option>
            <option>取材・コラボのご依頼</option>
            <option>広告掲載のご相談</option>
            <option>その他</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-ink-900 mb-1">
            お問い合わせ内容 <span className="text-amber-700">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-3 py-2 rounded border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none bg-amber-50/40 resize-y"
          />
        </div>

        {/* Honeypot — hidden bot trap. Real users won't fill it; bots will. */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <input type="hidden" name="_subject" value="Lucky Sun Shine お問い合わせ" />
        <input type="hidden" name="_language" value="ja" />

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold tracking-wide transition-colors"
        >
          送信する
        </button>

        <p className="text-xs text-ink-500 leading-relaxed">
          送信前に <a href="/privacy/" className="underline hover:text-amber-700">プライバシーポリシー</a> をご確認ください。
          フォームの送信には外部サービス Formspree を利用しています。
        </p>
      </form>
    </article>
  );
}
