"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { SupportedCurrency } from "../../actions/currency";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CurrencyLanguageSelector() {
  const { currency, config, allConfigs, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-border
                   bg-surface text-text-primary text-xs font-semibold
                   hover:border-primary hover:text-primary transition-colors duration-200"
      >
        <Globe className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">{config.flag}</span>
        <span className="hidden sm:inline uppercase">{currency}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            aria-label="Select currency and region"
            className="absolute right-0 top-full mt-2 w-72 bg-surface rounded-xl
                       border border-border shadow-xl z-[200] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border bg-bg-secondary">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Region &amp; Currency
              </p>
            </div>

            <div className="p-2 grid grid-cols-2 gap-1 max-h-80 overflow-y-auto">
              {allConfigs.map((cfg) => {
                const isActive = cfg.currency === currency;
                return (
                  <button
                    key={cfg.currency}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setCurrency(cfg.currency as SupportedCurrency);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left
                                transition-colors duration-150 w-full
                                ${
                                  isActive
                                    ? "bg-primary/10 border border-primary/30 text-primary"
                                    : "hover:bg-bg-secondary text-text-primary"
                                }`}
                  >
                    <span className="text-xl leading-none">{cfg.flag}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{cfg.label}</p>
                      <p className="text-[11px] text-text-muted uppercase">{cfg.currency}</p>
                    </div>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-2.5 border-t border-border bg-bg-secondary">
              <p className="text-[11px] text-text-muted">
                Prices and payment methods adjust to the selected region.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
