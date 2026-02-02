
import React, { useState, useMemo, useRef } from 'react';
import {
  Search, MapPin, Briefcase, Globe, Award,
  ShieldCheck, CheckCircle, Headphones, Star,
  ArrowRight, Sparkles, Quote, Target, Zap, ChevronRight, BadgeCheck,
  ChevronLeft, FileCheck, ExternalLink, ScrollText
} from 'lucide-react';
import { EUROPE_HOT_JOBS, TRUST_STATS, GULF_LOCATIONS } from '../constants';
import { Testimonial } from '../types';

interface HomeProps {
  onNavigate: (page: string, data?: any) => void;
  testimonials: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'd1',
    name: 'Rahul Deshmukh',
    role: 'Civil Engineer',
    content: 'JJ Brothers changed my life. Within 3 months of registration, I was placed in a top firm in Dubai with an incredible package. Their visa processing is super fast!',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
    rating: 5,
    timeAgo: '2 months ago',
    isVerified: true
  },
  {
    id: 'd2',
    name: 'Priya Sharma',
    role: 'Hospitality Manager',
    content: 'I highly recommend JJ Brothers for European placements. They handled my Croatia work permit with zero hassle. Extremely professional team.',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    rating: 5,
    timeAgo: '5 months ago',
    isVerified: true
  },
  {
    id: 'd3',
    name: 'Mohammed Ali',
    role: 'IT Specialist',
    content: 'The most transparent consultancy I have ever dealt with. They guide you at every step, from resume building to the final interview in Riyadh.',
    avatar: 'https://i.pravatar.cc/150?u=ali',
    rating: 5,
    timeAgo: '1 year ago',
    isVerified: true
  },
  {
    id: 'd4',
    name: 'Anjali Gupta',
    role: 'Nurse',
    content: 'Found a great opportunity in Qatar through them. The housing support they provided upon landing was a lifesaver. Thank you JJ Brothers!',
    avatar: 'https://i.pravatar.cc/150?u=anjali',
    rating: 5,
    timeAgo: '3 weeks ago',
    isVerified: true
  }
];

// 12 Gulf Success Visas for the Loop
const GULF_VISA_SUCCESS_LOOP = [
  { id: 1, country: 'UAE', city: 'Dubai', img: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=600' },
  { id: 2, country: 'Saudi Arabia', city: 'Riyadh', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600' },
  { id: 3, country: 'Qatar', city: 'Doha', img: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?auto=format&fit=crop&q=80&w=600' },
  { id: 4, country: 'Kuwait', city: 'Kuwait City', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600' },
  { id: 5, country: 'Oman', city: 'Muscat', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600' },
  { id: 6, country: 'Bahrain', city: 'Manama', img: 'https://images.unsplash.com/photo-1518391846015-55a9cc00ddb5?auto=format&fit=crop&q=80&w=600' },
  { id: 7, country: 'UAE', city: 'Abu Dhabi', img: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&q=80&w=600' },
  { id: 8, country: 'Saudi Arabia', city: 'Jeddah', img: 'https://images.unsplash.com/photo-1582213708522-f89419b09760?auto=format&fit=crop&q=80&w=600' },
  { id: 9, country: 'Qatar', city: 'Lusail', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600' },
  { id: 10, country: 'Jordan', city: 'Amman', img: 'https://images.unsplash.com/photo-1547039986-d393666f28be?auto=format&fit=crop&q=80&w=600' },
  { id: 11, country: 'Iraq', city: 'Erbil', img: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&q=80&w=600' },
  { id: 12, country: 'Kuwait', city: 'Salmiya', img: 'https://images.unsplash.com/photo-1563200020-f46399435a51?auto=format&fit=crop&q=80&w=600' },
];

const Home: React.FC<HomeProps> = ({ onNavigate, testimonials }) => {
  const [heroSearch, setHeroSearch] = useState('');

  const displayReviews = useMemo(() => {
    const list = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
    return [...list, ...list];
  }, [testimonials]);

  const visaLoop = useMemo(() => {
    return [...GULF_VISA_SUCCESS_LOOP, ...GULF_VISA_SUCCESS_LOOP];
  }, []);

  const partnerLogos = [
    { name: 'Saudi Aramco', domain: 'aramco.com' },
    { name: 'Emirates', domain: 'emirates.com' },
    { name: 'Qatar Airways', domain: 'qatarairways.com' },
    { name: 'Emaar', domain: 'emaar.com' },
    { name: 'Etihad Airways', domain: 'etihad.com' },
    { name: 'SABIC', domain: 'sabic.com' },
    { name: 'Gulf Air', domain: 'gulfair.com' },
    { name: 'Oman Air', domain: 'omanair.com' },
    { name: 'Hilton', domain: 'hilton.com' },
    { name: 'Marriott', domain: 'marriott.com' },
    { name: 'Hyatt', domain: 'hyatt.com' },
    { name: 'Jumeirah', domain: 'jumeirah.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Shell', domain: 'shell.com' },
    { name: 'BP', domain: 'bp.com' },
    { name: 'HSBC', domain: 'hsbc.com' },
    { name: 'Standard Chartered', domain: 'sc.com' },
    { name: 'Samsung', domain: 'samsung.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Facebook', domain: 'facebook.com' },
    { name: 'Tesla', domain: 'tesla.com' },
    { name: 'FedEx', domain: 'fedex.com' },
    { name: 'DHL', domain: 'dhl.com' },
    { name: 'Uber', domain: 'uber.com' },
    { name: 'Airbnb', domain: 'airbnb.com' }
  ];

  const loopedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-20">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-full lg:w-[1000px] h-full lg:h-[1000px] bg-blue-600/10 rounded-full blur-[180px] -translate-y-1/2 lg:translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-full lg:w-[800px] h-full lg:h-[800px] bg-amber-500/5 rounded-full blur-[150px] translate-y-1/4 lg:-translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
            <div className="w-full lg:w-3/5 text-center lg:text-left space-y-8 lg:space-y-10 animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[9.5rem] font-black text-white leading-[0.9] tracking-tighter">
                Accelerate <br className="hidden sm:block" />
                Your <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                  Global.
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                JJ Brothers Consultancy provides elite career pathways for professionals seeking high-growth roles in UAE, Europe, and Canada.
              </p>
              <div className="max-w-xl w-full mx-auto lg:mx-0 pt-4">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-2.5 rounded-[2.5rem] shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center group focus-within:border-amber-400/50 transition-all gap-3 sm:gap-0">
                  <div className="flex-1 flex items-center px-6">
                    <Search className="w-6 h-6 text-slate-500 mr-4" />
                    <input
                      type="text"
                      placeholder="What is your dream job?"
                      className="bg-transparent w-full text-white font-bold focus:outline-none placeholder:text-slate-600 text-base sm:text-lg"
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                    />
                  </div>
                  <button onClick={() => onNavigate('jobs')} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 whitespace-nowrap shadow-xl shadow-amber-500/20">Find Jobs</button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5 relative animate-fade-in-up delay-300">
              <div className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl border border-white/10 group aspect-[4/5] transform hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Consultancy Hub" />
                <div className="absolute bottom-10 left-10 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                    <p className="text-white font-black text-2xl tracking-tighter uppercase mb-1">Elite Global Partners</p>
                    <p className="text-blue-200 text-xs font-bold tracking-widest uppercase">Verified Placements in 22 Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.83C0,95.83,161,122.83,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Placement Partners Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter uppercase leading-tight">
            We have provided placement in <br /> these 20+ leading companies
          </h2>
          <div className="w-24 h-2 bg-amber-500 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="w-full overflow-hidden relative group bg-white">
          <div className="flex items-center gap-16 md:gap-32 animate-logo-cloud py-12">
            {loopedLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl hover:bg-amber-400 hover:border-amber-500 hover:scale-110 transition-all duration-300 p-6 min-w-[180px] shadow-sm"
              >
                <img
                  src={`https://logo.clearbit.com/${logo.domain}?size=200`}
                  alt={logo.name}
                  loading="lazy"
                  className="h-12 md:h-16 w-auto object-contain max-w-[140px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('clearbit')) {
                      target.src = `https://unavatar.io/${logo.domain}?fallback=false`;
                    } else if (target.src.includes('unavatar.io')) {
                      target.src = `https://www.google.com/s2/favicons?domain=${logo.domain}&sz=128`;
                    } else if (target.src.includes('google.com/s2')) {
                      target.src = `https://ui-avatars.com/api/?name=${logo.name}&background=f1f5f9&color=475569&bold=true`;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner & Vision Section - PREMIUM B&W PHOTOS */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[150px] -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative group">
              <div className="flex gap-6">
                <div className="flex-1 relative z-10 rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/20 shadow-3xl transform group-hover:-rotate-2 transition-transform duration-700 bg-slate-900">
                  <img src="https://ik.imagekit.io/ioktbcewp/dd44a37b-8453-4f63-bc0d-4aae1b50b894%20(1).jpg?tr=e-grayscale,e-contrast-50,e-sharpen-20" alt="Zeeshan Raja" className="w-full aspect-[3/4] object-cover contrast-150 brightness-110 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 md:bottom-10 left-4 md:left-8 right-4 md:right-8 text-center">
                    <h3 className="text-sm md:text-2xl font-black text-white uppercase tracking-tighter">Zeeshan Raja</h3>
                    <p className="text-amber-500 font-bold text-[7px] md:text-[11px] uppercase tracking-[0.3em] mt-1">Managing Director</p>
                  </div>
                </div>
                <div className="flex-1 relative z-10 rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/20 shadow-3xl transform group-hover:rotate-2 translate-y-6 md:translate-y-12 transition-transform duration-700 bg-slate-900">
                  <img src="https://ik.imagekit.io/ioktbcewp/0e614457-617b-4453-b28e-c052d4c21e05%20(1).jpg?tr=e-grayscale,e-contrast-50,e-sharpen-20" alt="Javed Raja" className="w-full aspect-[3/4] object-cover contrast-150 brightness-110 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 md:bottom-10 left-4 md:left-8 right-4 md:right-8 text-center">
                    <h3 className="text-sm md:text-2xl font-black text-white uppercase tracking-tighter">Javed Raja</h3>
                    <p className="text-amber-500 font-bold text-[7px] md:text-[11px] uppercase tracking-[0.3em] mt-1">Creative Director</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left mt-16 lg:mt-0">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Foundation of Trust</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                Bridging Talent <br /> & Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-white">Opportunity.</span>
              </h2>
              <p className="text-blue-100/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 font-serif italic">
                "Our journey is defined by the lives we transform. Transparency isn't just a policy; it's our promise to every Indian professional we represent."
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-2">
                  <p className="text-4xl md:text-5xl font-black text-white">1500+</p>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Global Placements</p>
                </div>
                <div className="space-y-2">
                  <p className="text-4xl md:text-5xl font-black text-white">100%</p>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Legal Transparency</p>
                </div>
              </div>
              <div className="pt-8">
                <button onClick={() => onNavigate('contact')} className="group flex items-center gap-4 text-white font-black uppercase text-xs tracking-[0.3em] hover:text-amber-400 transition-colors mx-auto lg:mx-0">
                  Connect With Us <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE LOOP GULF VISA WALL */}
      <section className="py-32 bg-slate-50 relative border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-500/10 text-amber-600 rounded-full mb-6">
            <FileCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Visa Success Tracker</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase">Recent Gulf Approvals</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-4">Witness the real results of India's most trusted recruitment partner.</p>
        </div>

        <div className="flex-1 w-full overflow-hidden relative">
          <div className="hidden md:block absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>
          <div className="hidden md:block absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-8 animate-scroll w-max py-10 will-change-transform">
            {visaLoop.map((visa, i) => (
              <div key={`${visa.id}-${i}`} className="w-[300px] md:w-[420px] bg-white rounded-[2.5rem] md:rounded-[3rem] p-4 border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                <div className="relative aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
                  <img
                    src={visa.img}
                    alt={visa.country}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="w-fit px-4 py-1.5 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-widest rounded-lg">
                        Verified Approval
                      </span>
                      <span className="text-white font-black text-xl uppercase tracking-tighter">
                        {visa.country} - {visa.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest">Processed in 35 Days</h4>
                    <p className="text-slate-400 font-bold text-[9px] mt-1 uppercase">Reference ID: #JJB-{visa.id}{i}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 group-hover:bg-blue-900 group-hover:text-white transition-all">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 flex justify-center">
          <button onClick={() => onNavigate('migration')} className="flex items-center gap-3 text-slate-950 font-black text-xs uppercase tracking-[0.2em] px-10 py-5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-950 hover:text-white transition-all shadow-sm">
            View All Success Stories <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Google Style Testimonials Section */}
      <section className="py-32 bg-white overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 space-y-4 px-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase">Recent Candidate Feedback</h2>
            <div className="flex items-center justify-center gap-2 text-amber-500">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
              <span className="text-slate-900 font-black ml-3 text-sm uppercase tracking-[0.2em]">Excellence Rated</span>
            </div>
          </div>

          <div className="flex-1 w-full overflow-hidden relative">
            <div className="hidden md:block absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

            <div className="flex gap-8 animate-scroll w-max py-10 will-change-transform">
              {displayReviews.map((review, i) => (
                <div key={`${review.id}-${i}`} className="w-[300px] md:w-[400px] bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/20 relative group transition-all hover:scale-105 duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4 md:gap-5">
                      <img src={review.avatar} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-xl object-cover" alt={review.name} />
                      <div>
                        <h4 className="text-slate-950 font-black text-sm md:text-base leading-tight capitalize">{review.name}</h4>
                        <p className="text-slate-400 font-bold text-[9px] md:text-[10px] mt-1 uppercase tracking-widest">{review.timeAgo}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 md:p-2.5 rounded-2xl">
                      <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" /></svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 mb-6">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(review.rating)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />)}
                    </div>
                    {review.isVerified && <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />}
                  </div>
                  <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed mb-8 line-clamp-4 italic">"{review.content}"</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Verified Candidate</span>
                    <button className="text-blue-600 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:text-blue-800 transition-colors">Full Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Gulf Hubs */}
      <section className="py-24 lg:py-32 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase">Gulf Strategic Hubs</h2>
            <div className="w-20 h-2 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-lg font-medium">Explore premium career networks in the Middle East's most resilient economies.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-10">
            {Array.from(new Set(GULF_LOCATIONS.map(l => l.country))).map((countryName) => {
              const country = GULF_LOCATIONS.find(l => l.country === countryName);
              if (!country) return null;
              return (
                <div key={countryName} className="flag-container bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center gap-8 group hover:bg-amber-400 hover:scale-105 hover:shadow-2xl hover:shadow-amber-200 transition-all duration-300 cursor-pointer text-center">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-inner transition-transform duration-500 group-hover:scale-110">
                    <img src={`https://flagcdn.com/w160/${country.code.toLowerCase()}.png`} alt={countryName} className="w-16 lg:w-20 object-contain animate-flag" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-black text-lg lg:text-xl uppercase tracking-tighter transition-colors group-hover:text-slate-950">{countryName}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Statistics Bar */}
      <section className="bg-slate-950 py-16 lg:py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[100px] -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center lg:justify-between items-center gap-12 lg:gap-16">
          {TRUST_STATS.map((stat, i) => (
            <div key={i} className="flex-1 min-w-[160px] group text-center lg:text-left">
              <div className="text-4xl lg:text-6xl font-black text-white mb-3 tracking-tighter transition-all group-hover:text-amber-500">{stat.value}</div>
              <div className="text-[10px] lg:text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
          <div className="w-full lg:w-auto mt-6 lg:mt-0">
            <button onClick={() => onNavigate('contact')} className="w-full lg:w-auto bg-amber-500 text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl shadow-amber-500/20 active:scale-95">Partner with us</button>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-[0.9]">Success <br /> Methodology</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Target, title: "Precision Mapping", desc: "Aligning your skills with the highest paying global markets." },
                  { icon: Zap, title: "Rapid Processing", desc: "Industry-leading visa turnaround times via verified channels." },
                  { icon: ShieldCheck, title: "Legal Security", desc: "Full compliance with international labor laws." },
                  { icon: Headphones, title: "Landing Support", desc: "On-ground assistance with housing and settling." }
                ].map((item, i) => (
                  <div key={i} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white transition-all group shadow-sm hover:shadow-xl">
                    <item.icon className="w-12 h-12 text-blue-900 mb-8 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-black text-slate-950 mb-4 uppercase tracking-widest">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-950 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-2xl border border-white/5">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]"></div>
              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-10 tracking-tight uppercase">Evaluate Your Profile</h3>
                <form className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Your Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-medium focus:outline-none focus:border-amber-400 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Number</label>
                    <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-medium focus:outline-none focus:border-amber-400 transition-colors" placeholder="+91 00000 00000" />
                  </div>
                  <button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-6 rounded-[2rem] shadow-2xl transition-all uppercase tracking-[0.2em] text-xs pt-7 active:scale-95 shadow-amber-500/10">Request Evaluation</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
