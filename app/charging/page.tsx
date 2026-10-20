import ContentPage from '@/components/ContentPage';
import SavingsCalculator from '@/components/SavingsCalculator';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Charging | Ampza' };

export default function ChargingPage() {
  return <ContentPage eyebrow="THE AMPZA CHARGING PLAN" title="Everything the app is planned to do, before it’s even built." intro="A clear path from finding a charger to finishing a session. The app is in development; these are concept screens and planned features." aside={<div className="planned-banner"><b>PRE-LAUNCH CONCEPT</b><span>App and station partnerships are in development. Feature availability may change before launch.</span></div>} sections={[
    { title: 'One app, from search to session', paragraphs: ['Find stations, compare connector types and pricing, then start and track a charge. The app will show the information drivers need at each step.'] },
    { title: 'How to charge', id: 'howto', bullets: ['Open the app and choose an available station and connector.', 'Plug the connector into your vehicle.', 'Tap your phone at the charger with AmpTap to authenticate and start.', 'Track energy, cost and elapsed time in the app; stop the session when you are ready.'] },
    { title: 'Auto Charge: plug in, that’s it', id: 'autocharge', paragraphs: ['Auto Charge is planned for launch. It is designed to start a session when you plug in, subject to compatibility primarily with your vehicle model. Vehicle, station and network support will determine availability; we will publish supported models before launch.'] },
    { title: 'RFID card: planned after launch', id: 'rfid', paragraphs: ['An optional Ampza RFID card is planned after launch. It will be linked to an account and let a driver start a session with a tap, including when phone connectivity is limited. AmpTap is the planned launch option; no separate RFID card is required at launch.'] },
    { title: 'Connector types', id: 'connectors', bullets: ['CCS2 — DC fast charging, used by many newer electric cars and SUVs in India.', 'Type 2 — AC charging for longer stops.', 'CHAdeMO — DC fast charging at select stations for compatible vehicles.'], paragraphs: ['Confirm your vehicle’s connector before travelling. The app is planned to list connector types for each station.'] },
    { title: 'See what switching could save you', id: 'savings', paragraphs: ['Use the figures below as an illustration only. Actual fuel and charging costs depend on your vehicle, tariff and driving conditions.'], children: <SavingsCalculator /> },
    { title: 'Frequently asked', paragraphs: ['Find answers about availability, charging, payments and support in the FAQ.'], children: <p><a className="text-link" href="/faqs">Browse all FAQs ↗</a></p> },
  ]} />;
}

