"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({
  items,
  className,
  defaultOpenIndex = 0,
}: {
  items: readonly FAQItem[];
  className?: string;
  defaultOpenIndex?: number | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <Reveal key={faq.question} delay={i * 0.04}>
            <div
              className="rounded-2xl overflow-hidden transition-colors duration-300"
              style={{
                border: `1px solid ${isOpen ? "rgba(0,212,255,0.28)" : "rgba(255,255,255,0.08)"}`,
                background: isOpen ? "rgba(13,18,40,0.85)" : "rgba(13,18,40,0.6)",
                backdropFilter: "blur(16px)",
                boxShadow: isOpen
                  ? "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,212,255,0.08)"
                  : "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-5 px-6 py-5 text-left group"
              >
                <span
                  className={cn(
                    "text-xs font-mono font-700 tracking-wider flex-shrink-0 transition-colors duration-300",
                    isOpen ? "text-[#00D4FF]" : "text-[rgba(232,243,255,0.35)]"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className={cn(
                    "font-display font-600 text-[15px] sm:text-base leading-snug flex-1 transition-colors duration-300",
                    isOpen ? "text-white" : "text-[rgba(232,243,255,0.88)] group-hover:text-white"
                  )}
                >
                  {faq.question}
                </span>

                <span
                  className={cn(
                    "w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    isOpen
                      ? "border-[rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.12)] rotate-45"
                      : "border-[rgba(255,255,255,0.14)] bg-white/[0.03] group-hover:border-[rgba(0,212,255,0.3)]"
                  )}
                >
                  <Plus className={cn("w-3.5 h-3.5 transition-colors duration-300", isOpen ? "text-[#00D4FF]" : "text-[rgba(232,243,255,0.6)]")} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-[3.75rem]">
                      <p className="text-[rgba(232,243,255,0.72)] text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
