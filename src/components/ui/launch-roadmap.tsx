'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RoadmapStep {
  title: string;
  text: string;
  detail: readonly string[];
}

export function LaunchRoadmap({ steps }: { steps: readonly RoadmapStep[] }) {
  // First phase open by default so the section never reads as an empty list.
  const [open, setOpen] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();

  return (
    <ol className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {steps.map((step, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-step-${index}`;

        return (
          <li key={step.title} className="relative">
            {/* Connector rule between phases. Decorative only. */}
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-[-0.75rem] top-14 hidden h-px w-3 bg-white/15 lg:block"
              />
            )}

            <div
              className={cn(
                'glass spotlight h-full overflow-hidden transition-colors duration-300',
                isOpen ? 'border-brand-cyan/30 shadow-glow' : 'hover:border-white/20',
              )}
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-start gap-4 p-7 text-left lg:p-8"
                >
                  <span
                    className={cn(
                      'mt-0.5 inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border font-heading text-sm font-extrabold transition-colors',
                      isOpen
                        ? 'border-brand-cyan/40 bg-brand-cyan/15 text-brand-cyan'
                        : 'border-white/15 bg-white/5 text-slate-400',
                    )}
                  >
                    {/* Visual numbering only; the <ol> already conveys order. */}
                    <span aria-hidden="true">{index + 1}</span>
                  </span>

                  <span className="flex-1">
                    <span className="block font-heading text-xl font-extrabold tracking-tight text-white lg:text-2xl">
                      {step.title}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-slate-400">
                      {step.text}
                    </span>
                  </span>

                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      'mt-1 h-5 w-5 shrink-0 text-brand-cyan transition-transform duration-300',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-3 border-t border-white/10 px-7 py-6 lg:px-8">
                      {step.detail.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand-green"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default LaunchRoadmap;
