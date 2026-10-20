import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { STRIPE_LINKS } from '../data/callListOffer';

const SEEN_KEY = 'summerlyn_intro_popup_seen';
const EMAIL_KEY = 'summerlyn_intro_popup_email';
const EXCLUDED = ['/call-list/success'];
const THRESHOLD = 0.45;

function seen() {
  try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
}
function markSeen() {
  try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ }
}

export default function IntroOfferPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const excluded = EXCLUDED.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (excluded || open || seen()) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= THRESHOLD) {
        lastFocus.current = document.activeElement as HTMLElement;
        markSeen();
        setOpen(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [excluded, open, pathname]);

  const close = useCallback(() => {
    markSeen();
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      const el = dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]');
      el?.focus();
    }, 30);
    return () => { document.body.style.overflow = prev; window.clearTimeout(t); };
  }, [open, step]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled])'));
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setError('Please enter a valid email address.'); return; }
    setError(''); setBusy(true);
    try { localStorage.setItem(EMAIL_KEY, v); } catch { /* ignore */ }
    const endpoint = import.meta.env.VITE_INTAKE_FORM_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: v, source: 'intro-popup', page: pathname }),
        });
      } catch { /* continue regardless */ }
    }
    setBusy(false);
    setStep(2);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={close} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-popup-title"
        aria-describedby="intro-popup-desc"
        onKeyDown={onKeyDown}
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 bg-ink-900 bg-gradient-to-br from-violet-500/15 via-ink-900 to-cyan-400/10 p-6 sm:p-8 shadow-2xl shadow-violet-900/40 max-h-[90vh] overflow-y-auto"
      >
        <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-zinc-400 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
          <span aria-hidden="true" className="text-xl leading-none">×</span>
        </button>
        {step === 1 ? (
          <form onSubmit={submit} noValidate>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Intro offer</p>
            <h2 id="intro-popup-title" className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">Try a call list for less than one lost deal.</h2>
            <p id="intro-popup-desc" className="mt-3 text-zinc-400">Drop your email to unlock our first-order intro offer: know who to call and what to say.</p>
            <label htmlFor="intro-popup-email" className="sr-only">Email address</label>
            <input
              id="intro-popup-email" data-autofocus type="email" autoComplete="email" inputMode="email" required
              value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
              aria-invalid={!!error} aria-describedby={error ? 'intro-popup-error' : undefined}
              className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            />
            {error && <p id="intro-popup-error" role="alert" className="mt-2 text-sm text-rose-400">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary mt-4 w-full justify-center">{busy ? 'Unlocking…' : 'Unlock the offer →'}</button>
            <p className="mt-3 text-center text-xs text-zinc-500">No spam. One email, unsubscribe anytime.</p>
          </form>
        ) : (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Unlocked · Pilot 15</p>
            <h2 id="intro-popup-title" className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white">15 call-ready contacts for <span className="text-cyan-300">$99</span></h2>
            <p id="intro-popup-desc" className="mt-3 text-zinc-400">Test the quality before you commit. One-time, no contracts.</p>
            <ul className="mt-5 space-y-2 text-sm text-zinc-300">
              {['15 researched contacts that fit your ideal customer', 'A dated reason to call each one now', 'Talking points and an opener for every call', 'Credited toward a Call Sprint within 14 days'].map((f) => (
                <li key={f} className="flex gap-2"><span aria-hidden="true" className="text-cyan-300">✓</span>{f}</li>
              ))}
            </ul>
            <a href={STRIPE_LINKS.pilot} data-autofocus onClick={markSeen} className="btn-primary mt-6 w-full justify-center">Get my 15 for $99 →</a>
            <button type="button" onClick={close} className="mt-3 w-full text-center text-sm text-zinc-500 hover:text-zinc-300">Maybe later</button>
          </div>
        )}
      </div>
    </div>
  );
}
