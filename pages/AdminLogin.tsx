
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Briefcase, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface AdminLoginProps {
  onSuccess: () => void;
  onNavigate: (page: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen pt-12 flex items-center justify-center px-4 bg-slate-950 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>

      <div className="w-full max-w-[400px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden relative z-10 animate-fade-in-up">
        <div className="bg-blue-900 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Briefcase className="text-amber-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Admin Portal</h1>
            <p className="text-blue-100/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-2">Authorized Personnel Only</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="p-8 md:p-12 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-[10px] font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-4 h-4 text-slate-300" />
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jjbrothers.me"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-11 pr-4 focus:outline-blue-900 text-sm font-bold" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-slate-300" />
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-11 pr-4 focus:outline-blue-900 text-sm font-bold" 
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-blue-900 text-white font-black rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group uppercase tracking-[0.2em] text-[10px] disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enter Dashboard'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
          
          <button 
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full text-center text-slate-400 font-bold text-[9px] uppercase tracking-widest hover:text-blue-900 transition-colors"
          >
            Return to Site
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
