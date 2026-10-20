import ContentPage from '@/components/ContentPage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Cookie Policy | Ampza' };
export default function CookiePage(){return <ContentPage eyebrow="LAST UPDATED · 17 OCTOBER 2026" title="Cookie Policy" intro="This policy explains how the Ampza website uses cookies and similar technologies. Read it with the Privacy Policy." sections={[
 {title:'What are cookies',paragraphs:['Cookies are small text files a website saves on your browser or device. They can help a site work, remember choices and understand how it is used.']},
 {title:'How we use them',bullets:['Essential cookies help pages, forms and security work.','Preference cookies can remember choices you make.','Analytics cookies help understand page visits and site performance, and should be used only with consent.','Ampza does not plan to use advertising cookies.']},
 {title:'Third-party cookies',paragraphs:['Some features provided by other services, such as maps, embedded content or payment pages, may set cookies under their own policies.']},
 {title:'The Ampza app',paragraphs:['The mobile app may use identifiers such as a device ID to keep you signed in and understand app performance. See the Privacy Policy for how that data is handled.']},
 {title:'Managing cookies',paragraphs:['You can delete or block cookies in browser settings. Blocking essential cookies may prevent parts of the site from working.']},
 {title:'Changes and contact',paragraphs:['Ampza may update this policy and post a new date. Questions? Email hello@ampza.in or call +91 98429 10644.']},
]}/>}
