
import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we are on a dark background page (Home hero)
  const isHome = currentPage === 'home';
  const forceDarkText = !isHome || scrolled;

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'Services', path: 'services' },
    { name: 'Migration', path: 'migration' },
    { name: 'Job Portal', path: 'jobs' },
    { name: 'Contact', path: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-200/50 py-3' : isHome ? 'bg-transparent py-6' : 'bg-white py-4 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Branding - Fixed Visibility */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className={`p-2.5 rounded-2xl transition-all duration-300 ${forceDarkText ? 'bg-blue-900 shadow-xl shadow-blue-100' : 'bg-white/10 backdrop-blur-xl border border-white/20'}`}>
              <Briefcase className={`${forceDarkText ? 'text-white' : 'text-amber-400'} w-6 h-6`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black uppercase tracking-tighter leading-none transition-colors ${forceDarkText ? 'text-blue-950' : 'text-white'}`}>
                JJ Brothers
              </span>
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] mt-1 transition-colors ${forceDarkText ? 'text-amber-500' : 'text-amber-400/80'}`}>Consultancy</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-xl ${
                  currentPage === link.path 
                    ? forceDarkText ? 'text-blue-900 bg-blue-50' : 'text-white bg-white/10'
                    : forceDarkText ? 'text-slate-500 hover:text-blue-900 hover:bg-slate-50' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className={`h-8 w-px mx-4 transition-colors ${forceDarkText ? 'bg-slate-100' : 'bg-white/10'}`}></div>
            <button 
              onClick={() => onNavigate('contact')}
              className={`text-[11px] font-black uppercase tracking-[0.15em] px-8 py-3.5 rounded-xl transition-all shadow-xl ${
                forceDarkText 
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20' 
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
              }`}
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-2xl transition-all ${forceDarkText ? 'text-slate-600 bg-slate-50' : 'text-white bg-white/10'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-8 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => { onNavigate(link.path); setIsOpen(false); }}
                className={`block w-full text-left px-6 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] ${
                  currentPage === link.path ? 'bg-blue-50 text-blue-900' : 'text-slate-600'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-8">
               <button 
                onClick={() => { onNavigate('contact'); setIsOpen(false); }}
                className="w-full bg-blue-900 text-white text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-2xl"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
