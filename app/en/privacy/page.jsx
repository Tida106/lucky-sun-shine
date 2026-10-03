import { site } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata = {
  title: 'Privacy Policy',
  description: `${site.name}'s privacy policy, covering our use of cookies, Google Analytics (GA4), and affiliate advertising.`,
  alternates: { canonical: '/en/privacy/' },
};

export default function PrivacyPageEn() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 prose-article">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} className="not-prose mb-6" locale="en" />
      <h1 className="font-display text-3xl font-extrabold text-ink-900 not-prose">
        Privacy Policy
      </h1>

      <h2>Handling of Personal Information</h2>
      <p>
        {site.name} ({site.url}) does not use any personal information collected through our
        contact form or similar channels for any purpose other than responding to your inquiry,
        replying to you, and verifying your identity when necessary. We will not provide your
        personal information to any third party without your consent.
      </p>

      <h2>Analytics Tools</h2>
      <p>
        We may use Google&apos;s web analytics service, Google Analytics (GA4), to understand how
        our site is used. Google Analytics uses cookies to collect traffic data. This traffic data
        is collected anonymously and does not identify you personally. You can opt out of this
        data collection by disabling cookies in your browser settings.
      </p>
      <p>
        For more details, please see the{' '}
        <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" rel="noopener" target="_blank">
          Google Analytics Terms of Service
        </a>{' '}
        and the <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">Google Privacy Policy</a>.
      </p>

      <h2>Advertising and Affiliate Cookies</h2>
      <p>
        We may use third-party advertising services, including Google AdSense, as well as
        affiliate programs such as Amazon Associates, Rakuten Affiliate, Awin, Viator, and
        Expedia. These advertising and affiliate partners may use cookies—information about your
        visits to this and other sites (which does not include your name, address, email address,
        or phone number)—to show you ads or offers relevant to your interests, and to track
        qualifying bookings or purchases made through our links.
      </p>
      <p>
        For details on how to disable cookies used for Google-served ads, and how to opt out of
        cookies used by other third-party advertisers, please see{' '}
        <a href="https://policies.google.com/technologies/ads" rel="noopener" target="_blank">
          Ads – Policies & Terms – Google
        </a>.
      </p>
      <p>
        {site.name} is a participant in the Amazon Associates Program, an affiliate advertising
        program designed to provide a means for sites to earn advertising fees by advertising and
        linking to Amazon.co.jp. We also participate in other affiliate programs, including Awin,
        Viator, and Expedia; details of these relationships are available on our{' '}
        <a href="/en/disclosure/">Affiliate Disclosure</a> page.
      </p>

      <h2>About Cookies</h2>
      <p>
        A cookie is a mechanism for storing browsing history and other information exchanged
        between your browser and a server while using a website, saved as a file on your device.
        The next time you visit the same page, the site operator can use this cookie information
        to adjust what is shown to you. You can disable cookies through your browser settings.
      </p>

      <h2>Disclaimer</h2>
      <p>
        While we take care to ensure the accuracy of the information on this site, we do not
        guarantee its accuracy or safety. {site.name} is not responsible for any disadvantages
        that may result from the use of information published on this site.
      </p>

      <h2>Copyright</h2>
      <p>
        The copyright of the text, images, and other content published on this site belongs to
        this site or to the original rights holders. Unauthorized reproduction is prohibited.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may revise the content of this privacy policy as necessary. Any changes will take
        effect as soon as they are posted on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please get in touch through our{' '}
        <a href="/contact/">contact form</a>.
      </p>
    </article>
  );
}
