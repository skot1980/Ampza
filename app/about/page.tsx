import ContentPage from '@/components/ContentPage';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About Ampza' };
export default function AboutPage() { return <ContentPage eyebrow="ABOUT AMPZA" title="Early days, on purpose." intro="Ampza is being built around a simple promise: charging should feel clear and dependable, from finding a station to finishing a session." sections={[
 {title:'Mission',paragraphs:['Make public EV charging easier to understand and use, with clear pricing and a reliable experience.']},
 {title:'What we build around',bullets:['Transparent pricing before a session starts.','Useful station information and availability.','Support when something does not go to plan.']},
 {title:'Reliability by design',paragraphs:['We are working toward a proposed standard of at least 97% monthly connector uptime, measured and reported station by station. Operational targets also include acknowledgement and restoration milestones. These are proposed targets for the network as it develops, not a current performance claim.']},
 {title:'Early days, on purpose',paragraphs:['The app and first station partnerships are in development. We plan to start in Tamil Nadu and Kerala, prove the operating model and reliability at our first stations, then consider expansion when the evidence supports it.']},
 {title:'What exists today',bullets:['A pre-launch website and charging experience concept.','Partner discussions for initial locations.','A roadmap to test station operations and customer experience before expansion.']},
 {title:'For investors and strategic partners',paragraphs:['We are open to conversations with strategic investors and partners. This page is for general information and is not an offer of securities. Please contact us for a discussion.']},
 {title:'Questions about Ampza',paragraphs:['For general questions, write to hello@ampza.in. For hosting, franchise or fleet discussions, use the partner enquiry form.'],children:<p><a className="text-link" href="/contact">Contact the team ↗</a> &nbsp; <a className="text-link" href="/business#partner-enquiry">Partner with Ampza ↗</a></p>},
]}/> }
