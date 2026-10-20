'use client';

import { useState } from 'react';
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export default function SavingsCalculator() {
  const [distance, setDistance] = useState(15000);
  const [petrolMileage, setPetrolMileage] = useState(15);
  const [petrolPrice, setPetrolPrice] = useState(105);
  const [evEfficiency, setEvEfficiency] = useState(6);
  const [electricityPrice, setElectricityPrice] = useState(20);
  const petrolCost = distance / Math.max(petrolMileage, 1) * petrolPrice;
  const evCost = distance / Math.max(evEfficiency, 1) * electricityPrice;
  const difference = petrolCost - evCost;

  return <div className="calculator"><div className="calculator-fields">
    <label>Distance per year (km)<input type="number" min="100" max="100000" value={distance} onChange={e=>setDistance(Number(e.target.value))}/></label>
    <label>Petrol efficiency (km/l)<input type="number" min="1" max="100" value={petrolMileage} onChange={e=>setPetrolMileage(Number(e.target.value))}/></label>
    <label>Petrol price (₹/l)<input type="number" min="1" value={petrolPrice} onChange={e=>setPetrolPrice(Number(e.target.value))}/></label>
    <label>EV efficiency (km/kWh)<input type="number" min="1" max="30" value={evEfficiency} onChange={e=>setEvEfficiency(Number(e.target.value))}/></label>
    <label>Charging tariff (₹/kWh)<input type="number" min="1" value={electricityPrice} onChange={e=>setElectricityPrice(Number(e.target.value))}/></label>
  </div><div className="calculator-results"><div><span>Illustrative petrol cost / year</span><b>{inr.format(petrolCost)}</b></div><div><span>Illustrative EV charging / year</span><b>{inr.format(evCost)}</b></div><div className="calculator-total"><span>{difference >= 0 ? 'Illustrative difference / year' : 'EV charging costs more / year'}</span><b>{inr.format(Math.abs(difference))}</b></div></div><p>Illustration only. Actual energy use, fuel prices and tariffs vary by vehicle, location and driving conditions. This is not a guaranteed saving.</p></div>;
}
