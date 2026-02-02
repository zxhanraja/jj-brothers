
import React, { useState } from 'react';
import { Mail, Lock, Briefcase, Eye, EyeOff, Github, ArrowRight, Zap } from 'lucide-react';

interface AuthProps {
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-violet-200 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl flex bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden min-h-[600px]">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-lg shadow-indigo-100">
               <Briefcase className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
              Candidate Portal
            </h2>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
              Access your global career applications.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-slate-300" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-indigo-500 text-sm font-bold" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-300" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 focus:outline-indigo-500 text-sm font-bold" 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Forgot password?</button>
              </div>
            </div>

            <button 
              onClick={onSuccess}
              className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group uppercase tracking-[0.2em] text-[10px]"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-4 font-black text-slate-300 tracking-widest">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] text-slate-700 uppercase tracking-widest">
                <Github className="w-5 h-5" /> GitHub
              </button>
              <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-black text-[10px] text-slate-700 uppercase tracking-widest">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg> Google
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="hidden lg:flex w-1/2 bg-indigo-600 p-20 flex-col justify-center text-white relative">
          <div className="absolute top-0 right-0 p-40 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 p-20 bg-black/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-black mb-6 leading-tight uppercase tracking-tighter">
              Global Opportunities <br />
              Are Waiting.
            </h3>
            <p className="text-indigo-100 text-lg leading-relaxed mb-12 font-medium">
              Join India's most trusted recruitment partner for Gulf and European placements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
