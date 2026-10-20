import ContentPage from '@/components/ContentPage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Pricing | Ampza' };
export default function PricingPage() { return <ContentPage eyebrow="CLEAR BEFORE YOU CHARGE" title="Pay per kWh. See the price before you start." intro="Charging prices depend on the charger and location. The applicable tariff will be shown in the Ampza app before a session begins." sections={[
  { title: 'What charging costs', paragraphs: ['You pay for the energy delivered, measured in kilowatt-hours (kWh). The tariff can vary by charger type, speed and location. There is no single network-wide rupee figure to rely on.'] },
  { title: 'Four things to know', bullets: ['The app shows the applicable tariff before you start.', 'Your session cost reflects the energy delivered at that station.', 'Tariffs can vary by location and charger type.', 'Taxes and any applicable charges are shown in the app and invoice.'] },
  { title: 'What you see, and when', bullets: ['Before: the station tariff per kWh.', 'During: your live session and running cost, where supported.', 'After: the final energy delivered and session amount on your receipt or invoice.'] },
  { title: 'How you pay', paragraphs: ['Payment options are planned to include UPI, debit and credit cards, net banking and the Ampza wallet. Available methods will be shown at checkout when the app launches. Wallet balances are intended for Ampza charging and are not transferable between users.'] },
  { title: 'Taxes and invoices', paragraphs: ['Applicable taxes will be reflected in the amount shown at checkout. A session invoice is planned in the app and by email.'] },
  { title: 'Illustrative example', paragraphs: ['For illustration only: a 25 kWh session at ₹20/kWh would total ₹500 before any applicable taxes or other displayed charges. This example is not a promise of Ampza’s tariff.'] },
]}/> }
