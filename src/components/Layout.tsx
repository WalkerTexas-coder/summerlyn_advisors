import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CONTACT_EMAIL, STRIPE_LINKS } from '../data/callListOffer';
import IntroOfferPopup from './IntroOfferPopup';

const nav = [
  { to: '/call-list', label: 'Call Lists' },
  { to: '/insights', label: 'Insights' },
  { to: '/advisory', label: 'Advisory' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-white">
      <img src="/favicon.svg" alt="" className="h-8 w-8" />
      <span className="font-semibold tracking-tight">Summerlyn<span className="text-zinc-500 font-normal"> Call Lists</span></span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`sticky top-0 z-50 transition ${scrolled || open ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/10' : 'border-b border-transparent'}`}>
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `transition hover:text-white ${isActive ? 'text-white' : 'text-zinc-400'}`}>{n.label}</NavLink>
          ))}
          <a href={STRIPE_LINKS.sprint} className="btn-primary !py-2 !px-4">Get my calls</a>
        </nav>
        <button className="md:hidden text-white p-2" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}</svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden container-x pb-6 flex flex-col gap-4 text-lg">
          {nav.map((n) => <NavLink key={n.to} to={n.to} className="text-zinc-300">{n.label}</NavLink>)}
          <a href={STRIPE_LINKS.sprint} className="btn-primary mt-2">Get my 50 calls</a>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4 text-sm">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="max-w-sm text-zinc-500">Don’t lose time with CRMs. Know who to call and what to say. Researched, call-ready B2B prospects in 3 business days.</p>
        </div>
        <div className="space-y-2">
          <p className="text-white font-medium mb-3">Product</p>
          <Link className="block text-zinc-400 hover:text-white" to="/call-list">Call Lists</Link>
          <Link className="block text-zinc-400 hover:text-white" to="/call-list#pricing">Pricing</Link>
          <Link className="block text-zinc-400 hover:text-white" to="/insights">Insights</Link>
        </div>
        <div className="space-y-2">
          <p className="text-white font-medium mb-3">Company</p>
          <Link className="block text-zinc-400 hover:text-white" to="/advisory">Advisory</Link>
          <Link className="block text-zinc-400 hover:text-white" to="/about">About</Link>
          <Link className="block text-zinc-400 hover:text-white" to="/contact">Contact</Link>
          <a className="block text-zinc-400 hover:text-white break-all" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="container-x pb-10 text-xs text-zinc-600 space-y-2">
        <p>Summerlyn Call Lists is a service of Summerlyn Advisors LLC, a Texas limited liability company. We use publicly available business contact information. Buyers are responsible for complying with the TCPA, Do-Not-Call rules, and other telemarketing and email laws when contacting listed individuals.</p>
        <p>© {new Date().getFullYear()} Summerlyn Advisors LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[700px] -z-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px] animate-drift" />
        <div className="absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>
      <Header />
      <main className="flex-grow relative">
        <Outlet />
      </main>
      <Footer />
      <IntroOfferPopup />
    </div>
  );
}
