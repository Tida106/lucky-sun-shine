export const metadata = {
  title: 'お問い合わせ',
  description: 'Lucky Sun Shine へのお問い合わせはこちらから。',
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold text-ink-900">お問い合わせ</h1>
      <p className="mt-4 text-ink-700 leading-relaxed">
        記事内容のご指摘・取材依頼・広告掲載等のお問い合わせは、以下のメールアドレスまでご連絡ください。
      </p>
      <div className="mt-6 p-5 rounded-xl bg-white border border-amber-200">
        <div className="text-sm text-ink-500">Email</div>
        <div className="mt-1 font-mono text-lg text-amber-800 break-all">
          contact [at] lucky-sun-shine.com
        </div>
        <p className="mt-3 text-xs text-ink-500 leading-relaxed">
          ※ スパム対策のため [at] と表記しています。送信時は @ に置き換えてください。<br />
          ※ お返事までに数日いただく場合があります。
        </p>
      </div>
    </article>
  );
}
