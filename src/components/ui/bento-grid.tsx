'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import {
  Bot,
  Check,
  Gauge,
  MapPin,
  Search,
  Server,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon names are strings in src/data/site.ts so the content file stays free of
// component imports. Every name used there must exist in this map.
const ICONS: Record<string, LucideIcon> = {
  search: Search,
  'map-pin': MapPin,
  gauge: Gauge,
  server: Server,
  bot: Bot,
  workflow: Workflow,
};

export interface BentoItem {
  icon: string;
  name: string;
  blurb: string;
  bullets: readonly string[];
  /** Columns to occupy on the 6-column desktop grid. */
  span?: 2 | 3 | 4 | 6;
}

const SPAN_CLASS: Record<number, string> = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  6: 'lg:col-span-6',
};

function BentoCard({ item }: { item: BentoItem }) {
  const Icon = ICONS[item.icon] ?? Search;
  const span = item.span ?? 3;
  const isWide = span === 6;

  const cardRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const prefersReducedMotion = useReducedMotion();

  // Cursor-tracked border glow. Writing to motion values keeps this off the
  // React render path entirely - no state updates on pointermove.
  const borderGlow = useMotionTemplate`radial-gradient(16rem circle at ${mouseX}px ${mouseY}px, rgba(0,229,255,0.55), transparent 70%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = cardRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  const handlePointerLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group glass spotlight relative overflow-hidden p-7 lg:p-9',
        'transition-shadow duration-300 hover:shadow-card-hover',
        SPAN_CLASS[span],
      )}
    >
      {/* The glow layer: a bright gradient masked to a 1px inset border. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          padding: 1,
        }}
      />

      <div className={cn(isWide && 'lg:flex lg:items-start lg:gap-12')}>
        <div className={cn(isWide && 'lg:max-w-sm lg:shrink-0')}>
          <span className="inline-grid h-12 w-12 place-items-center rounded-xl border border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyan">
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="mt-6 font-heading text-xl font-bold text-white lg:text-2xl">
            {item.name}
          </h3>
          <p className="mt-3 leading-relaxed text-slate-400">{item.blurb}</p>
        </div>

        <ul
          className={cn(
            'mt-7 space-y-3 border-t border-white/10 pt-6',
            isWide && 'lg:mt-0 lg:grid lg:flex-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-3 lg:space-y-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0',
          )}
        >
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm text-slate-300">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function BentoGrid({ items }: { items: readonly BentoItem[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-6 lg:gap-6">
      {items.map((item) => (
        <BentoCard key={item.name} item={item} />
      ))}
    </div>
  );
}

export default BentoGrid;
