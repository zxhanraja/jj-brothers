
import React, { useState, useMemo } from 'react';
import { Filter, Search, MapPin, ChevronDown, SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react';
import { CATEGORIES, GULF_LOCATIONS } from '../constants';
import { JobType, ExperienceLevel, Job } from '../types';
import JobCard from '../components/JobCard';

interface JobListingProps {
  onNavigate: (page: string, data?: any) => void;
  jobs: Job[];
}

const JobListing: React.FC<JobListingProps> = ({ onNavigate, jobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<JobType[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<ExperienceLevel[]>([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = !selectedCategory || job.category === selectedCategory;
      const matchType = selectedType.length === 0 || selectedType.includes(job.type);
      const matchLevel = selectedLevel.length === 0 || selectedLevel.includes(job.experience);
      return matchSearch && matchCategory && matchType && matchLevel;
    });
  }, [searchTerm, selectedCategory, selectedType, selectedLevel, jobs]);

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-slate-50">
      {/* Search Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-14 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-[100px] -z-0 opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 md:mb-8 tracking-tighter uppercase">Global Job Portal</h1>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-5">
              <div className="flex-1 flex items-center bg-slate-50 px-6 py-4 rounded-[1.2rem] md:rounded-[1.5rem] border border-slate-100 group focus-within:border-blue-200 transition-all">
                <Search className="w-5 h-5 text-slate-400 mr-4" />
                <input 
                  type="text" 
                  placeholder="Search roles or keywords..."
                  className="bg-transparent w-full focus:outline-none text-slate-700 font-bold text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-blue-900 hover:bg-blue-950 text-white font-black py-4 px-12 rounded-[1.2rem] md:rounded-[1.5rem] transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest text-[10px] md:text-xs">
                Find Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10 md:gap-12 pb-32">
        {/* Sidebar - Improved for Mobile (horizontal scroll) */}
        <aside className="lg:w-80 space-y-8">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-100 shadow-sm lg:sticky lg:top-32">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[9px] md:text-[10px] flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-900" /> Filter Jobs
              </h3>
            </div>

            <div>
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Industry</h4>
              <div className="flex lg:flex-col overflow-x-auto no-scrollbar gap-2 lg:space-y-2 pb-4 lg:pb-0">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    className={`whitespace-nowrap w-full text-left px-4 md:px-5 py-3 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-wider transition-all border ${
                      selectedCategory === cat ? 'bg-blue-900 text-white border-blue-900' : 'bg-white hover:bg-slate-50 text-slate-500 border-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8 px-2">
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">
              Showing <span className="text-slate-900">{filteredJobs.length}</span> Opportunities
            </p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onClick={(j) => onNavigate('job-detail', j)} featured={job.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 md:py-32 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 px-6">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">No Matches</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-10">Try expanding your search parameters.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory(''); setSelectedType([]); setSelectedLevel([]); }}
                className="bg-blue-900 text-white px-10 py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JobListing;
