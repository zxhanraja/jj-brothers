
import React from 'react';
import { Briefcase, Facebook, Instagram, MessageCircle, Mail, MapPin, Phone, Globe, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  siteConfig: any;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, siteConfig }) => {
  // Clean the whatsapp number to be used in the wa.me link
  const whatsappLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}`;

  const socialLinks = [
    { name: 'Facebook', Icon: Facebook, url: 'https://www.facebook.com/share/1A9qG4Y1PR/?mibextid=wwXIfr' },
    { name: 'Instagram', Icon: Instagram, url: 'https://www.instagram.com/jj_brother_consultancy?igsh=MWQ1ODNxOXBpMWg3Nw==' },
    { name: 'WhatsApp', Icon: MessageCircle, url: whatsappLink },
  ];

  return (
    <footer className="bg-slate-950 pt-32 pb-16 px-6 text-slate-400 overflow-hidden relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24 pb-20 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-amber-500 p-2.5 rounded-2xl">
                <Briefcase className="text-slate-950 w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">JJ Brothers</span>
            </div>
            <p className="text-sm leading-relaxed font-medium max-w-sm italic opacity-70">
              Transforming global aspirations into success stories. ISO Certified overseas consultancy partner for Indian professionals.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg hover:shadow-amber-500/20"
                  aria-label={social.name}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
             <div className="space-y-8">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                   <div className="w-2 h-2 bg-amber-500 rounded-full"></div> Head Office
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-xs font-bold leading-relaxed text-slate-300">
                      {siteConfig.address}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-xs font-black text-white">{siteConfig.phone}</p>
                  </div>
                </div>
             </div>

             <div className="space-y-8">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Support Hub
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <p className="text-xs font-black text-white">{siteConfig.email}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-slate-300">WhatsApp: {siteConfig.whatsapp}</p>
                  </div>
                </div>
             </div>

             <div className="space-y-8">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Administration
                </h4>
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => onNavigate('admin')} 
                      className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-2"
                    >
                      <Lock className="w-3 h-3" /> Admin Panel
                    </button>
                  </li>
                  {['Migration', 'Services', 'Jobs', 'Contact'].map((link) => (
                    <li key={link}>
                      <button 
                        onClick={() => onNavigate(link.toLowerCase())} 
                        className="text-xs font-bold uppercase tracking-widest hover:text-amber-500 transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em]">
          <p>© 2024 JJ Brothers Consultancy. Expert Overseas Placements.</p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Disclaimer'].map((p) => (
              <button key={p} onClick={() => onNavigate(p.toLowerCase())} className="hover:text-white transition-colors">{p}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
