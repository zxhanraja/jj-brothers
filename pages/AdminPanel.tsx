
import React, { useState } from 'react';
import { 
  Settings, Briefcase, Plus, Trash2, Edit3, Globe, 
  Save, AlertCircle, ChevronLeft, LayoutDashboard, FileText, MessageSquare, Quote, Star, CheckCircle, LogOut
} from 'lucide-react';
import { Job, JobType, ExperienceLevel, Testimonial } from '../types';
import { supabase } from '../services/supabase';

interface AdminPanelProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  siteConfig: any;
  setSiteConfig: React.Dispatch<React.SetStateAction<any>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  onNavigate: (page: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  jobs, setJobs, siteConfig, setSiteConfig, testimonials, setTestimonials, onNavigate 
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'settings' | 'testimonials'>('jobs');
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '', companyName: '', location: '', salary: '', 
    type: JobType.FULL_TIME, experience: ExperienceLevel.ENTRY, 
    category: 'Engineering', description: '', requirements: []
  });

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '', role: '', content: '', avatar: 'https://i.pravatar.cc/150?u=' + Date.now(),
    rating: 5, isVerified: true, timeAgo: 'Just now'
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onNavigate('home');
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const jobToAdd = {
      ...newJob,
      companyLogo: 'https://picsum.photos/seed/jobs/100/100',
      featured: false,
    };
    
    const { data, error } = await supabase.from('jobs').insert([jobToAdd]).select();
    
    if (error) {
      alert("Error adding job: " + error.message);
    } else if (data) {
      setJobs([data[0], ...jobs]);
      setIsAddingJob(false);
      setNewJob({ title: '', companyName: '', description: '', requirements: [] });
    }
    setLoading(false);
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from('testimonials').insert([newTestimonial]).select();
    
    if (error) {
      alert("Error adding review: " + error.message);
    } else if (data) {
      setTestimonials([data[0], ...testimonials]);
      setIsAddingTestimonial(false);
      setNewTestimonial({ name: '', role: '', content: '', avatar: 'https://i.pravatar.cc/150?u=' + Date.now(), rating: 5, isVerified: true, timeAgo: 'Just now' });
    }
    setLoading(false);
  };

  const updateConfig = async () => {
    setLoading(true);
    const { error } = await supabase.from('site_config').update(siteConfig).eq('id', 1);
    if (error) alert("Update failed: " + error.message);
    else alert("Settings saved!");
    setLoading(false);
  };

  const deleteItem = async (id: string, type: 'job' | 'testimonial') => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      const table = type === 'job' ? 'jobs' : 'testimonials';
      const { error } = await supabase.from(table).delete().eq('id', id);
      
      if (error) {
        alert("Delete failed: " + error.message);
      } else {
        if (type === 'job') setJobs(jobs.filter(j => j.id !== id));
        else setTestimonials(testimonials.filter(t => t.id !== id));
      }
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">Admin Panel</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px] mt-1">Manage Site Content</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-red-700 transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-blue-900 transition-all">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
          {/* Tabs Sidebar - Now compact horizontal scroll on mobile */}
          <div className="lg:col-span-3">
            <div className="flex lg:flex-col overflow-x-auto no-scrollbar gap-2 pb-2 lg:pb-0 lg:space-y-2">
              <button 
                onClick={() => setActiveTab('jobs')} 
                className={`whitespace-nowrap flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'jobs' ? 'bg-blue-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
              >
                <Briefcase className="w-4 h-4" /> Jobs
              </button>
              <button 
                onClick={() => setActiveTab('testimonials')} 
                className={`whitespace-nowrap flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'testimonials' ? 'bg-blue-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
              >
                <MessageSquare className="w-4 h-4" /> Reviews
              </button>
              <button 
                onClick={() => setActiveTab('settings')} 
                className={`whitespace-nowrap flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-blue-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}
              >
                <Settings className="w-4 h-4" /> Settings
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === 'jobs' && (
              <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-100 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Active Jobs ({jobs.length})</h2>
                  <button onClick={() => setIsAddingJob(!isAddingJob)} className="w-full sm:w-auto bg-amber-500 text-slate-950 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 transition-all">
                    <Plus className="w-4 h-4" /> New Job
                  </button>
                </div>

                {isAddingJob && (
                  <form onSubmit={handleAddJob} className="mb-10 bg-slate-50 p-6 rounded-[2rem] border border-slate-200 animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input required type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="Job Title" />
                      <input required type="text" value={newJob.companyName} onChange={e => setNewJob({...newJob, companyName: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="Company" />
                      <input required type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="Location" />
                      <input required type="text" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" placeholder="Salary Range" />
                    </div>
                    <textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm h-32 outline-none focus:border-blue-500 mb-4" placeholder="Job Description"></textarea>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button disabled={loading} type="submit" className="flex-1 bg-blue-900 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50">
                        {loading ? 'Saving...' : 'Save Job'}
                      </button>
                      <button type="button" onClick={() => setIsAddingJob(false)} className="flex-1 sm:flex-none border border-slate-200 text-slate-500 px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="space-y-3">
                  {jobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200 font-black text-blue-900 text-xs shadow-sm">
                          {job.companyName.charAt(0)}
                        </div>
                        <div className="max-w-[150px] sm:max-w-none">
                          <h4 className="font-black text-slate-900 text-xs sm:text-sm truncate">{job.title}</h4>
                          <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{job.companyName}</p>
                        </div>
                      </div>
                      <button onClick={() => deleteItem(job.id, 'job')} className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-100 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Candidate Reviews ({testimonials.length})</h2>
                  <button onClick={() => setIsAddingTestimonial(!isAddingTestimonial)} className="w-full sm:w-auto bg-blue-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all">
                    <Plus className="w-4 h-4" /> Add Review
                  </button>
                </div>

                {isAddingTestimonial && (
                  <form onSubmit={handleAddTestimonial} className="mb-10 bg-blue-50 p-6 rounded-[2rem] border border-blue-100 animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input required type="text" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" placeholder="Candidate Name" />
                      <input required type="text" value={newTestimonial.timeAgo} onChange={e => setNewTestimonial({...newTestimonial, timeAgo: e.target.value})} className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" placeholder="Time (e.g. 1 year ago)" />
                    </div>
                    <textarea required value={newTestimonial.content} onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})} className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm font-medium h-32 outline-none mb-4" placeholder="Review Content..."></textarea>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button disabled={loading} type="submit" className="flex-1 bg-blue-900 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50">
                        {loading ? 'Publishing...' : 'Publish'}
                      </button>
                      <button type="button" onClick={() => setIsAddingTestimonial(false)} className="flex-1 sm:flex-none border border-blue-100 text-blue-600 px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest">Cancel</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map(t => (
                    <div key={t.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between hover:border-blue-100 transition-all">
                      <div>
                         <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                               <img src={t.avatar} className="w-8 h-8 rounded-full border border-white shadow-sm" alt={t.name} />
                               <div>
                                  <h4 className="text-[10px] font-black text-slate-900 leading-none truncate max-w-[100px]">{t.name}</h4>
                                  <p className="text-[8px] text-slate-400 mt-1">{t.timeAgo}</p>
                               </div>
                            </div>
                         </div>
                         <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                            {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                         </div>
                        <p className="text-[10px] sm:text-xs font-medium text-slate-600 line-clamp-3 italic leading-relaxed">"{t.content}"</p>
                      </div>
                      <div className="flex items-center justify-end pt-4 mt-4 border-t border-slate-200/50">
                        <button onClick={() => deleteItem(t.id, 'testimonial')} className="p-2 text-slate-300 hover:text-red-500 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-8">Global Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                      <input type="text" value={siteConfig.phone} onChange={e => setSiteConfig({...siteConfig, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-900 outline-none font-bold" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input type="text" value={siteConfig.email} onChange={e => setSiteConfig({...siteConfig, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-900 outline-none font-bold" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Address</label>
                    <textarea value={siteConfig.address} onChange={e => setSiteConfig({...siteConfig, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-24 focus:border-blue-900 outline-none font-bold leading-relaxed"></textarea>
                  </div>
                  <button disabled={loading} onClick={updateConfig} className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 disabled:opacity-50">
                    <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Update Settings'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
