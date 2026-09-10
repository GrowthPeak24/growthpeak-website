'use client';

import { useId, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const UPLIFTS = [
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
] as const;

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
        <output htmlFor={id} className="font-heading text-lg font-bold text-brand-cyan">
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
        className="roi-slider mt-3 w-full"
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
  const [monthlyCustomers, setMonthlyCustomers] = useState(8);
  const [uplift, setUplift] = useState<number>(2);
  const prefersReducedMotion = useReducedMotion();

  const { extraCustomers, monthlyGain, annualGain } = useMemo(() => {
    const extra = Math.round(monthlyCustomers * (uplift - 1));
    return {
      extraCustomers: extra,
      monthlyGain: extra * customerValue,
      annualGain: extra * customerValue * 12,
    };
  }, [customerValue, monthlyCustomers, uplift]);

  return (
    <div className={cn('glass glass-glow overflow-hidden p-7 lg:p-10', className)}>
      <div className="flex items-center gap-3">
        <span className="inline-grid h-10 w-10 place-items-center rounded-xl border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan">
          <Calculator className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="font-heading text-xl font-bold text-white">
          What would better local visibility be worth?
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
            label="Customers you win from Google each month today"
            min={1}
            max={50}
            step={1}
            value={monthlyCustomers}
            onChange={setMonthlyCustomers}
          />

          <fieldset>
            <legend className="font-ui text-sm font-semibold text-slate-300">
              Visibility uplift you&rsquo;re aiming for
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {UPLIFTS.map((option) => {
                const active = option.value === uplift;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setUplift(option.value)}
                    aria-pressed={active}
                    className={cn(
                      'relative rounded-full px-4 py-2 font-ui text-sm font-semibold transition-colors',
                      active ? 'text-brand-abyss' : 'text-slate-300 hover:text-white',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="roi-uplift-pill"
                        className="absolute inset-0 rounded-full bg-brand-gradient"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 30 }
                        }
                      />
                    )}
                    <span className="relative">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Output panel */}
        <div className="flex flex-col justify-center rounded-2xl border border-brand-cyan/20 bg-brand-abyss/60 p-7 text-center">
          <p className="mx-auto inline-flex items-center rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 font-ui text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-cyan">
            {modelLabel}
          </p>
          <p className="mt-5 font-ui text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Modelled additional revenue per year
          </p>
          <motion.p
            key={annualGain}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-heading text-4xl font-extrabold text-gradient lg:text-5xl"
          >
            {currency.format(annualGain)}
          </motion.p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-left">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Extra customers / mo
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 font-heading text-xl font-bold text-white">
                <TrendingUp className="h-4 w-4 text-brand-green" aria-hidden="true" />+
                {extraCustomers}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Extra revenue / mo
              </dt>
              <dd className="mt-1 font-heading text-xl font-bold text-white">
                {currency.format(monthlyGain)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Honesty guard: this is arithmetic on the visitor's own inputs, not a
          claim about results we have produced. Keep this disclaimer visible. */}
      <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-relaxed text-slate-500">
        <strong className="font-semibold text-slate-400">{modelLabel}.</strong> Output is
        arithmetic on the figures you enter above &mdash; extra customers &times; your average
        customer value. These are not verified historical client outcomes, not a projection
        from any past campaign, and not a guarantee of future performance.
      </p>
    </div>
  );
}

export default RoiEstimator;
