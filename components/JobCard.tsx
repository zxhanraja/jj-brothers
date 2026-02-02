
import React from 'react';
import { MapPin, Clock, DollarSign, Bookmark, ArrowRight } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, featured }) => {
  // Helper to extract country code from location string for flags
  const getFlagCode = (location: string) => {
    if (location.includes('UAE')) return 'ae';
    if (location.includes('Saudi Arabia')) return 'sa';
    if (location.includes('Qatar')) return 'qa';
    if (location.includes('Kuwait')) return 'kw';
    if (location.includes('Oman')) return 'om';
    if (location.includes('Bahrain')) return 'bh';
    if (location.includes('Iraq')) return 'iq';
    if (location.includes('Jordan')) return 'jo';
    if (location.includes('Egypt')) return 'eg';
    if (location.includes('Turkey')) return 'tr';
    if (location.includes('Croatia')) return 'hr';
    if (location.includes('Bosnia')) return 'ba';
    return null;
  };

  const flagCode = getFlagCode(job.location);

  return (
    <div 
      className={`group relative bg-white rounded-[2rem] p-8 transition-all duration-500 cursor-pointer border ${
        featured 
          ? 'border-amber-100 shadow-xl shadow-amber-50/30' 
          : 'border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-slate-200/50'
      }`}
      onClick={() => onClick(job)}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Company Logo Section */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
          <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
        </div>
        
        {/* Info Section */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-colors">
              {job.title}
            </h3>
            {featured && (
              <span className="hidden md:inline-block bg-amber-50 text-amber-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-amber-100">
                Premium Partner
              </span>
            )}
          </div>
          <p className="text-blue-600 text-sm font-black mb-6 uppercase tracking-wider">{job.companyName}</p>
          
          <div className="flex flex-wrap gap-y-3 gap-x-8 text-slate-500 font-bold text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-white">
                {flagCode ? (
                  <img 
                    src={`https://flagcdn.com/w40/${flagCode}.png`} 
                    alt="flag" 
                    className="w-4 h-auto animate-flag"
                  />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-300" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer Section */}
      <div className="mt-10 flex flex-wrap items-center justify-between pt-8 border-t border-slate-50 gap-6">
        <div className="flex flex-wrap gap-2">
          <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {job.category}
          </span>
          <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
            {job.experience}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-3 text-slate-300 hover:text-amber-500 transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
          <div className="h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-all duration-500">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
