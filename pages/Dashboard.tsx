
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Settings, 
  Bell, 
  LogOut, 
  PlusCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  BarChart3,
  User,
  Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', apps: 4 },
  { name: 'Tue', apps: 7 },
  { name: 'Wed', apps: 5 },
  { name: 'Thu', apps: 9 },
  { name: 'Fri', apps: 12 },
  { name: 'Sat', apps: 6 },
  { name: 'Sun', apps: 8 },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="lg:w-72 bg-white border-b lg:border-r border-slate-100 flex flex-col lg:sticky lg:top-24 lg:h-[calc(100vh-96px)]">
        <div className="p-4 lg:p-6">
          <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black">JD</div>
            <div>
              <p className="text-sm font-black text-slate-900">John Doe</p>
              <p className="text-xs font-bold text-indigo-600">Candidate</p>
            </div>
          </div>
        </div>

        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible px-4 py-2 lg:py-4 gap-1 lg:space-y-1">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'applied', name: 'Applied Jobs', icon: Briefcase },
            { id: 'resumes', name: 'My Resumes', icon: FileText },
            { id: 'saved', name: 'Saved Jobs', icon: Zap },
            { id: 'settings', name: 'Account Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`whitespace-nowrap flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" /> {item.name}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block p-6 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">Welcome back, John!</h1>
              <p className="text-slate-500 text-sm">Here's what's happening with your applications.</p>
            </div>
            <div className="flex gap-4">
              <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Applied</p>
                <h3 className="text-2xl font-black text-slate-900">28</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">In Progress</p>
                <h3 className="text-2xl font-black text-slate-900">12</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Interview Invited</p>
                <h3 className="text-2xl font-black text-slate-900">4</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" /> Activity
                </h3>
                <select className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                    />
                    <Area type="monotone" dataKey="apps" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
               <h3 className="text-lg font-black text-slate-900 mb-6">Updates</h3>
               <div className="space-y-6">
                 {[
                   { title: 'Invitation', desc: 'Google technical interview.', time: '2h ago', icon: Zap, color: 'bg-indigo-50 text-indigo-600' },
                   { title: 'Viewed', desc: 'Aramco viewed your application.', time: '5h ago', icon: Eye, color: 'bg-blue-50 text-blue-600' },
                 ].map((act, i) => (
                   <div key={i} className="flex gap-4">
                     <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${act.color}`}>
                       <act.icon className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                       <p className="text-xs text-slate-500 mt-0.5">{act.desc}</p>
                       <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{act.time}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Job Table View */}
          <div className="bg-white rounded-3xl border border-slate-100 p-4 md:p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">Recent Applications</h3>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50">
                      <th className="pb-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Company</th>
                      <th className="pb-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Job Title</th>
                      <th className="pb-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { company: 'Emirates Tech', role: 'Software Engineer', status: 'In Review', color: 'text-amber-600 bg-amber-50' },
                      { company: 'Qatar Airways', role: 'Full Stack Dev', status: 'Shortlisted', color: 'text-emerald-600 bg-emerald-50' },
                      { company: 'Riyadh Holdings', role: 'Project Manager', status: 'Closed', color: 'text-slate-400 bg-slate-50' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">{row.company}</td>
                        <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">{row.role}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.color}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Eye: React.FC<any> = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

export default Dashboard;
