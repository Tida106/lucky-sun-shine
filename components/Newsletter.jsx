// Newsletter signup form. Uses a Buttondown-compatible POST endpoint
// (works with Buttondown, ConvertKit, Mailchimp's hosted action URL,
// etc). Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT to switch providers.
//
// The form falls back to a "coming soon" placeholder when no endpoint
// is configured, so you can place the component anywhere without
// breaking layout before launch.
import SunOrnament from './icons/SunOrnament';

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

export default function Newsletter({ heading = '開運メールマガジン', tagline = '週1で、その週の運気・パワーストーン・開運アクションをお届け。' }) {
  return (
    <aside className="card-elev rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-900 dark:to-rose-900 border border-amber-200 dark:border-amber-700 p-6">
      <h3 className="font-display text-lg font-bold text-ink-900 dark:text-amber-50 flex items-center gap-2">
        <SunOrnament className="w-5 h-5 text-amber-500 shrink-0" />
        <span>{heading}</span>
      </h3>
      <span aria-hidden="true" className="heading-rule mt-2 ml-7" />
      <p className="mt-3 text-sm text-ink-700 dark:text-amber-100 leading-relaxed">
        {tagline}
      </p>
      {ENDPOINT ? (
        <form
          action={ENDPOINT}
          method="POST"
          target="popupwindow"
          className="mt-4 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="メールアドレス"
            autoComplete="email"
            className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-ink-900 border border-amber-200 dark:border-amber-700 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
          />
          <button type="submit" className="btn-primary">
            登録する
          </button>
        </form>
      ) : (
        <div className="mt-4 px-4 py-3 rounded-full bg-white/70 dark:bg-ink-900/70 text-center text-xs text-ink-500 dark:text-amber-200">
          まもなくスタート（準備中）
        </div>
      )}
      <p className="mt-3 text-[11px] text-ink-500 dark:text-amber-200 leading-relaxed">
        ※ いつでも配信停止できます。<a href="/privacy/" className="underline hover:text-amber-700">プライバシーポリシー</a> をご確認のうえご登録ください。
      </p>
    </aside>
  );
}
