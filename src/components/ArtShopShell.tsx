import { Link, Outlet } from 'react-router-dom';
import CookieConsent from './CookieConsent';

function Scenery() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#f4efe4]" />
      <div className="absolute inset-x-0 top-0 h-[68%] bg-[radial-gradient(ellipse_at_top,_#fbf6ec_0%,_#e7f0df_46%,_#d5e3cc_100%)]" />
      <div className="absolute -top-16 right-[12%] h-72 w-72 rounded-full bg-[#f0d48a]/70 blur-3xl" />
      <div className="absolute top-24 left-[8%] h-40 w-56 rounded-full bg-[#d7e7c8]/80 blur-2xl" />
      <div className="absolute bottom-0 left-[-8%] h-[46%] w-[54%] rounded-[50%_50%_0_0] bg-[#6e8f62]" />
      <div className="absolute bottom-0 left-[18%] h-[38%] w-[48%] rounded-[46%_54%_0_0] bg-[#3f6b45]" />
      <div className="absolute bottom-0 right-[-10%] h-[52%] w-[58%] rounded-[48%_42%_0_0] bg-[#234833]" />
      <div className="absolute bottom-[18%] left-[6%] h-56 w-40 rounded-full bg-[#2c5a3b]" />
      <div className="absolute bottom-[22%] left-[14%] h-40 w-28 rounded-full bg-[#3f6a46]" />
      <div className="absolute bottom-[16%] left-[22%] h-64 w-36 rounded-full bg-[#1f4632]" />
      <div className="absolute bottom-[20%] right-[18%] h-52 w-32 rounded-full bg-[#27553a]" />
      <div className="absolute bottom-[24%] right-[10%] h-72 w-44 rounded-full bg-[#163828]" />
      <div className="absolute bottom-[14%] right-[28%] h-36 w-24 rounded-full bg-[#4e7a50]" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,_#1a3a28_0%,_#7ea36a_55%,_transparent_100%)]" />
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,_transparent_0_1px,_rgba(90,70,40,0.05)_1px)] bg-[length:7px_7px]" />
    </div>
  );
}

export default function ArtShopShell() {
  return (
    <div className="art-shop relative min-h-screen overflow-x-hidden text-[#243127]">
      <Scenery />
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link to="/art" className="font-display text-2xl font-light tracking-tight text-[#1b3024] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6d5420]">
          Summerlyn Art
        </Link>
      </header>
      <main className="relative z-10">
        <Outlet />
      </main>
      <footer className="relative z-10 px-6 pb-10 pt-16 text-sm text-[#f6f1e6] md:px-12">
        <Link to="/" className="underline decoration-[#f6f1e6]/40 underline-offset-4 hover:decoration-[#f6f1e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0d48a]">
          Summerlyn Advisors
        </Link>
      </footer>
      <CookieConsent />
    </div>
  );
}
