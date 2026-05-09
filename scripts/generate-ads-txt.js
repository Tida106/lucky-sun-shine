// Emit public/ads.txt from NEXT_PUBLIC_ADSENSE_CLIENT (or
// ADSENSE_PUBLISHER_ID without the "ca-pub-" prefix).
// AdSense expects:
//   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
const fs = require('node:fs');
const path = require('node:path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

let pubId = process.env.ADSENSE_PUBLISHER_ID;
if (!pubId && process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
  pubId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT.replace(/^ca-/, '');
}

if (!pubId) {
  // Write a placeholder so the route exists and crawlers don't 404.
  // The line is commented out so it has no effect until a real ID is set.
  const placeholder = `# ads.txt placeholder — set NEXT_PUBLIC_ADSENSE_CLIENT or
# ADSENSE_PUBLISHER_ID in CI to populate this file.
# Example after AdSense approval:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'ads.txt'), placeholder);
  console.log('✓ ads.txt — placeholder (no AdSense ID set)');
  process.exit(0);
}

const line = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'ads.txt'), line);
console.log(`✓ ads.txt — ${pubId}`);
