import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, loadAnalytics, OPEN_EVENT, setConsent } from '../lib/consent';

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Reserve space at the bottom of the page so the banner never covers content (e.g. plan cards on mobile).
  useEffect(() => {
    const el = ref.current;
    if (!open || !el) { document.body.style.paddingBottom = ''; return; }
    const ro = new ResizeObserver(() => { document.body.style.paddingBottom = `${el.offsetHeight}px`; });
    ro.observe(el);
    return () => { ro.disconnect(); document.body.style.paddingBottom = ''; };
  }, [open, custom]);

  useEffect(() => {
    const c = getConsent();
    if (!c) setOpen(true); else { setAnalytics(c.analytics); loadAnalytics(); }
    const onOpen = () => { setAnalytics(getConsent()?.analytics ?? false); setCustom(true); setOpen(true); };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;
  const decide = (a: boolean) => { setConsent(a); setOpen(false); setCustom(false); };

  return (
    <div ref={ref} role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="fixed inset-x-0 bottom-0 z-[110] p-2 sm:p-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-ink-900/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        <p id="cookie-title" className="font-semibold text-white text-sm sm:text-base">Cookies & privacy</p>
        <p className="mt-1 text-xs text-zinc-400 sm:hidden">Necessary storage only, unless you allow analytics. <Link to="/privacy#cookies" className="underline hover:text-white">Privacy Policy</Link>.</p>
        <p className="mt-2 text-sm text-zinc-400 hidden sm:block">
          We use strictly necessary storage to run this site (for example, remembering this choice). With your permission we would also use analytics cookies to understand how the site is used. Nothing non-essential loads until you accept. See our <Link to="/privacy#cookies" className="underline hover:text-white">Privacy Policy</Link>.
        </p>
        {custom && (
          <div className="mt-4 space-y-3 rounded-xl border border-white/10 p-4 text-sm">
            <label className="flex items-start gap-3 text-zinc-300"><input type="checkbox" checked disabled className="mt-1 h-4 w-4" /><span><b className="text-white">Strictly necessary</b> · always on. Required for the site, checkout links, and your cookie choice.</span></label>
            <label className="flex items-start gap-3 text-zinc-300"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-4 w-4 accent-cyan-400" /><span><b className="text-white">Analytics</b> · optional. Helps us measure visits and improve pages.</span></label>
          </div>
        )}
        <div className="mt-3 sm:mt-4 grid grid-cols-3 sm:flex sm:flex-row gap-2 sm:justify-end [&>button]:!px-2 [&>button]:!py-2 [&>button]:!text-xs sm:[&>button]:!px-6 sm:[&>button]:!text-sm">
          {custom
            ? <button type="button" onClick={() => decide(analytics)} className="btn-ghost !py-2">Save choices</button>
            : <button type="button" onClick={() => setCustom(true)} className="btn-ghost !py-2">Customize</button>}
          <button type="button" onClick={() => decide(false)} className="btn-ghost !py-2"><span className="sm:hidden">Reject</span><span className="hidden sm:inline">Reject non-essential</span></button>
          <button type="button" onClick={() => decide(true)} className="btn-primary !py-2 !shadow-none">Accept all</button>
        </div>
      </div>
    </div>
  );
}
