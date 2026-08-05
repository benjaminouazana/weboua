'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { mainNav } from '@/lib/site';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {mainNav.map((item) =>
            item.highlight ? (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-mint/10 px-3.5 py-1.5 text-sm font-semibold text-emerald transition-colors hover:bg-mint/20"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-forest"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary">
            Lancer mon projet
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-forest md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  item.highlight
                    ? 'flex items-center gap-2 rounded-xl bg-mint/10 px-3 py-2.5 text-base font-semibold text-emerald'
                    : 'rounded-xl px-3 py-2.5 text-base font-medium text-forest hover:bg-cream'
                }
              >
                {item.highlight && <span className="h-1.5 w-1.5 rounded-full bg-emerald" />}
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Lancer mon projet
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
