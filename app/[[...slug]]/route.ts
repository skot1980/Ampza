import { readFile } from 'node:fs/promises';
import path from 'node:path';

const mockups: Record<string, string> = {
  '/': 'Ampza_Homepage_Mockup.html',
  '/charging': 'Ampza_Charging_Page_Mockup.html',
  '/pricing': 'Ampza_Pricing_Page_Mockup.html',
  '/business': 'Ampza_Business_Page_Mockup.html',
  '/about': 'Ampza_About_Page_Mockup.html',
  '/faqs': 'Ampza_FAQs_Page_Mockup.html',
  '/contact': 'Ampza_Contact_Page_Mockup.html',
  '/privacy-policy': 'Ampza_Privacy_Policy_Mockup.html',
  '/terms-and-conditions': 'Ampza_Terms_and_Conditions_Mockup.html',
  '/cancellation-and-refund-policy': 'Ampza_Cancellation_and_Refund_Policy_Mockup.html',
  '/cookie-policy': 'Ampza_Cookie_Policy_Mockup.html',
};

const routesByMockup: Record<string, string> = {
  'Ampza_Homepage_Mockup.html': '/',
  'Ampza_Charging_Page_Mockup.html': '/charging',
  'Ampza_Pricing_Page_Mockup.html': '/pricing',
  'Ampza_Business_Page_Mockup.html': '/business',
  'Ampza_About_Page_Mockup.html': '/about',
  'Ampza_FAQs_Page_Mockup.html': '/faqs',
  'Ampza_Contact_Page_Mockup.html': '/contact',
  'Ampza_Privacy_Policy_Mockup.html': '/privacy-policy',
  'Ampza_Terms_and_Conditions_Mockup.html': '/terms-and-conditions',
  'Ampza_Cancellation_and_Refund_Policy_Mockup.html': '/cancellation-and-refund-policy',
  'Ampza_Cookie_Policy_Mockup.html': '/cookie-policy',
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fileName = mockups[url.pathname.replace(/\/$/, '') || '/'];
  if (!fileName) return new Response('Not Found', { status: 404 });
  const filePath = path.join(process.cwd(), 'public', 'mockups', fileName);
  let html = await readFile(filePath, 'utf8');
  html = html.replace(/href=(['"])([^'"]+\.html(?:#[^'"]*)?)\1/gi, (match, quote: string, destination: string) => {
    const [file, hash] = destination.split('#', 2);
    const route = routesByMockup[file];
    return route ? `href=${quote}${route}${hash ? `#${hash}` : ''}${quote}` : match;
  });
  html = html.replace('</head>', '  <link rel="icon" href="/ampza-logo-mark.svg">\n</head>');
  html = html.replace('</body>', '  <script src="/mockups/form-bridge.js" defer></script>\n</body>');
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
