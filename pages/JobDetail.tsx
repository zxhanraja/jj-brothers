
import React, { useState } from 'react';
import {
  MapPin, Clock, DollarSign, Calendar, Briefcase, ChevronLeft,
  Share2, Bookmark, CheckCircle, ExternalLink, ShieldCheck,
  TrendingUp, Building2, Send, X, FileUp
} from 'lucide-react';
import { Job } from '../types';

interface JobDetailProps {
  job: Job;
  onBack: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onBack }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-900 transition-colors font-black uppercase tracking-widest text-[10px] mb-8"
        >
          <ChevronLeft className="w-5 h-5" /> Back to listings
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-0 opacity-50"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-center">
                <div className="w-24 h-24 bg-slate-50 rounded-3xl p-4 border border-slate-100 flex items-center justify-center shadow-inner">
                  <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain grayscale opacity-60" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-black text-slate-900 mb-2 leading-tight tracking-tight">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                    <span className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> {job.companyName}
                    </span>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {job.postedAt}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"><Share2 className="w-5 h-5" /></button>
                  <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all border border-slate-100"><Bookmark className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-slate-50">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Job Type</p>
                  <p className="text-sm font-black text-slate-800 uppercase tracking-wider">{job.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Experience</p>
                  <p className="text-sm font-black text-slate-800 uppercase tracking-wider">{job.experience}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Salary</p>
                  <p className="text-sm font-black text-slate-800 uppercase tracking-wider">{job.salary}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Industry</p>
                  <p className="text-sm font-black text-slate-800 uppercase tracking-wider">{job.category}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm space-y-10">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">About the Role</h3>
                <p className="text-slate-500 leading-relaxed font-medium whitespace-pre-line">{job.description}</p>
              </div>

              {job.requirements.length > 0 && (
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest">Requirements</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 font-bold text-sm">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-8 bg-blue-900/5 border border-blue-900/10 rounded-[2rem] flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-blue-100">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">JJ Brothers Trust Shield</h4>
                  <p className="text-sm text-slate-500 font-medium">Your application is handled securely. We verify every employer and never ask for payments for processing.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:w-[400px] space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-28">
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-widest">Apply Now</h3>

              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full py-5 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-950 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 group uppercase tracking-[0.2em] text-xs"
                >
                  Start Application <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full py-5 bg-slate-50 text-slate-700 font-black rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px]">
                  Save for Later
                </button>
              </div>

              <div className="pt-8 border-t border-slate-100 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-2 overflow-hidden flex items-center justify-center">
                    <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain grayscale" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">{job.companyName}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Verified Employer</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] py-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                  Full Company Profile <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Web3Forms Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-blue-900 p-10 text-white relative">
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Job Application</h2>
              <p className="text-blue-100 text-sm font-bold uppercase tracking-widest opacity-80">Applying for: {job.title} at {job.companyName}</p>
            </div>

            <div className="p-10">
              {formStatus === 'success' ? (
                <div className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase">Application Sent!</h3>
                  <p className="text-slate-500 font-medium">Your resume and details have been sent to JJ Brothers Consultancy. We will contact you soon.</p>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="bg-blue-900 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  action="https://api.web3forms.com/submit"
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={() => setFormStatus('sending')}
                  className="space-y-6"
                >
                  {/* Web3Forms Access Key - Placeholder, should be replaced with real key */}
                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                  <input type="hidden" name="subject" value={`New Application: ${job.title} - JJ Brothers`} />
                  <input type="hidden" name="from_name" value="JJ Brothers Career Portal" />
                  <input type="hidden" name="job_title" value={job.title} />
                  <input type="hidden" name="company" value={job.companyName} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input required name="name" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:outline-blue-500" placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input required name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:outline-blue-500" placeholder="rahul@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                      <input required name="phone" type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:outline-blue-500" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Location</label>
                      <input required name="location" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:outline-blue-500" placeholder="e.g. Mumbai, India" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience (Years)</label>
                      <input required name="experience" type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:outline-blue-500" placeholder="e.g. 5" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notice Period</label>
                      <select required name="notice_period" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold focus:outline-blue-500 appearance-none">
                        <option value="Immediate">Immediate</option>
                        <option value="15 Days">15 Days</option>
                        <option value="1 Month">1 Month</option>
                        <option value="2 Months">2 Months</option>
                        <option value="3 Months">3 Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload Resume (PDF/DOC)</label>
                    <div className="relative group">
                      <input required name="attachment" type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-8 px-4 flex flex-col items-center justify-center gap-2 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                        <FileUp className="w-8 h-8 text-slate-300 group-hover:text-blue-500" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-900">Choose File</span>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={formStatus === 'sending'}
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-500/10 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {formStatus === 'sending' ? 'Processing...' : 'Submit Professional Profile'} <Send className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">By clicking submit, you agree to our terms and conditions.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
