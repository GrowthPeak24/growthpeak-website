'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail?: string;
}

function CounterValue({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? metric.value : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, metric.value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, metric.value, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {metric.prefix}
      {display}
      {metric.suffix}
    </span>
  );
}

export function MetricCounters({
  metrics,
  className,
}: {
  metrics: readonly Metric[];
  className?: string;
}) {
  return (
    <dl className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="glass spotlight px-6 py-8 text-center transition-colors duration-300 hover:border-brand-cyan/30"
        >
          <dt className="sr-only">{metric.label}</dt>
          <dd>
            <span className="block font-heading text-4xl font-extrabold text-gradient lg:text-5xl">
              <CounterValue metric={metric} />
            </span>
            <span className="mt-3 block font-ui text-sm font-semibold text-white">
              {metric.label}
            </span>
            {metric.detail && (
              <span className="mt-2 block text-sm leading-relaxed text-slate-400">
                {metric.detail}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default MetricCounters;
