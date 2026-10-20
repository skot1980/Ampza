import ContentPage from '@/components/ContentPage';
import FaqList from '@/components/FaqList';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'FAQs and support | Ampza' };
const groups = [
 {title:'General',items:[
  {q:'What is Ampza?',a:'Ampza is an EV charging network being built for Tamil Nadu and Kerala, around one promise: if a station is shown as available, it should work. You will find stations, see the price, start a session and track the charge in one app. We are pre-launch, and building the app and our first station partnerships now.'},
  {q:'Where will Ampza stations be?',a:'We are starting in Tamil Nadu and Kerala, with stations at host sites such as malls, hotels, offices and restaurants. Stations appear on the app map as they go live. Join the waitlist to hear when one opens near you.'},
  {q:'When does Ampza launch?',a:'We have not announced a launch date. We would rather open a small number of tested stations than rush a large network. Join the waitlist and we will tell you first.'},
  {q:'Which vehicles can charge at Ampza stations?',a:'Our planned launch connectors include CCS2 DC fast charging, Type 2 AC charging and CHAdeMO at select stations. Check your vehicle’s charging port before you go; connector types will be listed for each station.'},
  {q:'How long does charging take?',a:'It depends on your battery size, how full it is, and the maximum rate your car accepts. As a rough guide, DC fast charging typically takes around 30 to 60 minutes to go from 20% to 80%, while AC charging takes several hours. Your vehicle manual has the figures for your model.'},
 ]},
 {title:'App and account',items:[
  {q:'How do I download the Ampza app?',a:'The app is not live yet. When it launches, download links for the App Store and Google Play will be on this site. Join the waitlist to be notified.'},
  {q:'How do I create an account?',a:'The planned sign-up flow uses a mobile number verified with an OTP, then asks for your name and vehicle details.'},
  {q:'Can I use Ampza without the app?',a:'At launch the app is planned to be the main way to charge. An optional Ampza RFID card is planned after launch.'},
  {q:'How do I update or delete my personal data?',a:'Email hello@ampza.in from your registered address, or use the in-app request option when available. See our Privacy Policy for your rights and how long data is kept.'},
 ]},
 {title:'Starting and tracking a charge',items:[
  {q:'How do I start a charge?',a:'Open the app and choose a station and connector. Plug the connector into your car. Tap your phone at the station with AmpTap to start the session. Track speed, cost and time in the app. This describes the planned app experience.'},
  {q:'What is AmpTap?',a:'AmpTap is planned to let you start a session by tapping your phone at the station. No separate RFID card is required at launch.'},
  {q:'What is Auto Charge, and will it work with my car?',a:'Auto Charge is planned for launch. It is designed to start a session when you plug in. Compatibility depends primarily on your vehicle model, and station or network support may also affect availability.'},
  {q:'What is the Ampza RFID card?',a:'An optional card linked to your account, planned after launch. Tap it to start a session without using the app at the charger; it may be useful when phone signal is limited.'},
  {q:'How do I know a charger is available before I go?',a:'The app is planned to show station status, connector type, distance and price. Ampza is aiming for at least 97% monthly uptime per connector; that is a proposed target, not a current performance claim.'},
  {q:'Can I stop a session early?',a:'The planned experience lets you stop a session in the app or at the charger. The session amount should reflect the energy delivered, subject to the tariff and terms shown before charging.'},
 ]},
 {title:'Payments, wallet and invoices',items:[
  {q:'How is the price calculated?',a:'You pay per kWh of energy delivered. The applicable tariff is planned to be shown in the app before you start. See Pricing for details.'},
  {q:'Which payment methods can I use?',a:'UPI, debit and credit cards, net banking and the Ampza wallet are planned. Available methods will be shown in the app at checkout.'},
  {q:'How do I top up my wallet?',a:'Wallet top-up is a planned app feature. The wallet is intended for Ampza charging and balances are not intended to be transferred to another user.'},
  {q:'Will I get an invoice?',a:'An invoice for each session in the app and by email is planned. Details may change before launch.'},
  {q:'How do I get a refund?',a:'See the Cancellation & Refund Policy. It describes the process for sessions that do not start, stop because of a fault, or are billed incorrectly.'},
 ]},
 {title:'If something goes wrong',items:[
  {q:'What should I do if my charge does not start?',a:'Check that the connector is fully plugged in and your vehicle is ready to charge, then try again. If the issue continues, contact support at support@ampza.in or +91 98429 10644. If a payment was taken for a session that did not start, contact us with the transaction details.'},
  {q:'I was charged but my session stopped early. What now?',a:'Send us the station, date and session or transaction ID through the grievance form. We will review the station and payment records.'},
  {q:'A station showed as available but did not work. Why?',a:'Please report it to us so we can investigate. Ampza plans to track uptime, session success and fault restoration for each station.'},
  {q:'How do I contact support?',a:'Email support@ampza.in or call +91 98429 10644. See Contact for the message and grievance forms.'},
  {q:'How do I make a complaint?',a:'Use the grievance form on our Contact page. Tell us what happened and include a session or transaction ID if you have one.'},
 ]},
 {title:'Hosting and partnerships',items:[
  {q:'How do I host an Ampza station at my property?',a:'Tell us about your site through the partner enquiry form. We look for repeat footfall and dwell time, a suitable power connection or a path to add one, parking with safe access, and a visible, convenient location. Responsibilities and revenue share are agreed in writing.'},
  {q:'What does it cost to become a host or franchise partner?',a:'Commercial terms are agreed with each partner in writing before a station goes live. Start with the partner enquiry form.'},
  {q:'Can I list my existing charger on Ampza?',a:'We can review compatible charger models and discuss listing. Protocol compatibility and operations must be confirmed before a listing is promised.'},
  {q:'Do you offer charging plans for fleets?',a:'We are discussing fleet and corporate charging, including consolidated billing and usage visibility. Contact the team to discuss your requirements.'},
 ]},
];
export default function FAQsPage(){return <ContentPage eyebrow="HELP, WITHOUT THE HUNT" title="Questions, answered." intro="Ampza is pre-launch. Answers about features and services describe the current plan and may change before launch." sections={[{title:'Browse by topic',children:<FaqList groups={groups}/>},{title:'Still need help?',paragraphs:['Email support@ampza.in or call +91 98429 10644. For a complaint, submit a grievance through the Contact page.'],children:<p><a className="text-link" href="/contact">Contact support ↗</a></p>}]}/>}
