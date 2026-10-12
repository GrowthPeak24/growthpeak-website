'use client';

import { useId, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const decimal = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function Slider({
  label,
  suffix,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-ui text-sm font-semibold text-slate-300">
          {label}
        </label>
        <output htmlFor={id} className="font-heading text-lg font-semibold tabular-nums text-brand-cyan">
          {format ? format(value) : value}
          {suffix}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="roi-slider mt-1 w-full"
        style={{ '--roi-percent': `${percent}%` } as React.CSSProperties}
      />
    </div>
  );
}

export function RoiEstimator({
  className,
  modelLabel = 'Interactive Estimate Model',
}: {
  className?: string;
  /** Names the widget's output as a model, never as a verified client result. */
  modelLabel?: string;
}) {
  const [customerValue, setCustomerValue] = useState(750);
  const [missedEnquiries, setMissedEnquiries] = useState(10);
  const [closeRate, setCloseRate] = useState(30);
  const prefersReducedMotion = useReducedMotion();

  const { lostCustomers, monthlyLoss, annualLoss } = useMemo(() => {
    const lost = missedEnquiries * (closeRate / 100);
    return {
      lostCustomers: lost,
      monthlyLoss: Math.round(lost * customerValue),
      annualLoss: Math.round(lost * customerValue * 12),
    };
  }, [customerValue, missedEnquiries, closeRate]);

  return (
    <div className={cn('glass glass-glow overflow-hidden p-7 lg:p-10', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan">
          <Calculator className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-white">
          What are missed leads costing you?
        </h3>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-7">
          <Slider
            label="Average value of one new customer"
            min={100}
            max={5000}
            step={50}
            value={customerValue}
            onChange={setCustomerValue}
            format={(value) => currency.format(value)}
          />
          <Slider
            label="Enquiries missed or answered too late each month"
            min={1}
            max={50}
            step={1}
            value={missedEnquiries}
            onChange={setMissedEnquiries}
          />
          <Slider
            label="How many enquiries you close when you do reply"
            suffix="%"
            min={5}
            max={80}
            step={5}
            value={closeRate}
            onChange={setCloseRate}
          />
        </div>

        {/* Output panel */}
        <div className="flex flex-col justify-center rounded-2xl border border-brand-cyan/20 bg-brand-abyss/60 p-7 text-center">
          <p className="mx-auto inline-flex items-center rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 font-ui text-xs font-semibold uppercase tracking-[0.12em] text-brand-cyan">
            {modelLabel}
          </p>
          <p className="mt-5 font-ui text-sm font-medium text-slate-300">
            Modelled revenue slipping away each year
          </p>
          <motion.p
            key={annualLoss}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-heading text-4xl font-bold tabular-nums tracking-[-0.02em] text-white lg:text-5xl"
          >
            {currency.format(annualLoss)}
          </motion.p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-left">
            <div>
              <dt className="font-ui text-sm text-slate-400">
                Customers lost per month
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 font-heading text-xl font-semibold tabular-nums text-white">
                <TrendingDown className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
                {decimal.format(lostCustomers)}
              </dd>
            </div>
            <div>
              <dt className="font-ui text-sm text-slate-400">
                Revenue lost per month
              </dt>
              <dd className="mt-1 font-heading text-xl font-semibold tabular-nums text-white">
                {currency.format(monthlyLoss)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Honesty guard: this is arithmetic on the visitor's own inputs, not a
          claim about results we have produced. Keep this disclaimer visible. */}
      <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-slate-400">
        <strong className="font-semibold text-slate-400">{modelLabel}.</strong> Output is
        arithmetic on the figures you enter above &mdash; missed enquiries &times; your close
        rate &times; your average customer value. These are not verified historical client
        outcomes, not a projection from any past campaign, and not a guarantee of what any
        system will recover.
      </p>
    </div>
  );
}

export default RoiEstimator;
