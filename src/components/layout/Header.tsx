import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './Navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-bold text-primary-500">
            Summerlyn Advisors
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Desktop CTA Button */}
          <Link
            to="/contact"
            className="hidden md:block btn-primary"
          >
            Schedule Call
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Navigation mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
            <Link
              to="/contact"
              className="btn-primary w-full mt-4 text-center block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Schedule Call
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
