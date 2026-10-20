'use client';

import { useState } from 'react';
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export default function BusinessRoiCalculator(){
  const [investment,setInvestment]=useState(20);
  const [energyCost,setEnergyCost]=useState(8.5);
  const [carsPerDay,setCarsPerDay]=useState(8);
  const [kwhPerSession,setKwhPerSession]=useState(25);
  const [tariff,setTariff]=useState(20);
  const annualGross=Math.max(0,(tariff-energyCost)*kwhPerSession*carsPerDay*365);
  const payback=annualGross>0?investment*100000/annualGross:null;
  return <div className="calculator"><div className="calculator-fields">
    <label>Project cost (₹ lakh)<input type="number" min="1" value={investment} onChange={e=>setInvestment(Number(e.target.value))}/></label>
    <label>Energy cost (₹/kWh)<input type="number" min="0" step="0.1" value={energyCost} onChange={e=>setEnergyCost(Number(e.target.value))}/></label>
    <label>Cars per day<input type="number" min="1" value={carsPerDay} onChange={e=>setCarsPerDay(Number(e.target.value))}/></label>
    <label>Energy per session (kWh)<input type="number" min="1" value={kwhPerSession} onChange={e=>setKwhPerSession(Number(e.target.value))}/></label>
    <label>Illustrative customer tariff (₹/kWh)<input type="number" min="0" step="0.5" value={tariff} onChange={e=>setTariff(Number(e.target.value))}/></label>
  </div><div className="calculator-results"><div><span>Annual gross contribution, before other costs</span><b>{inr.format(annualGross)}</b></div><div className="calculator-total"><span>Simple payback illustration</span><b>{payback ? `${payback.toFixed(1)} years` : 'Not positive at these inputs'}</b></div></div><p>Illustrative sensitivity only, not a forecast or offer. Excludes GST/tax, revenue share, financing, operating costs, downtime and other site-specific expenses. Terms are agreed in writing.</p></div>;
}
