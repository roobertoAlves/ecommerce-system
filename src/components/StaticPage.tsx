"use client";

import Container from "./Container";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";

interface Props {
  titleKey: string;
  children: React.ReactNode;
}

export default function StaticPage({ titleKey, children }: Props) {
  const t = useTranslations("pages");
  const tNav = useTranslations("nav");
  const title = t(titleKey as Parameters<typeof t>[0]);

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-surface border-b border-border py-12">
        <Container>
          <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
            <Link href="/" className="hover:text-primary transition-colors">{tNav("home")}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">{title}</span>
          </nav>
          <h1 className="text-4xl font-black text-text-primary tracking-tight">{title}</h1>
        </Container>
      </div>
      <Container className="py-12 max-w-4xl">
        <div className="space-y-8">{children}</div>
      </Container>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold text-text-primary border-b border-border pb-2">{title}</h2>
      <div className="text-text-muted text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-text-primary text-sm">
      {children}
    </div>
  );
}
