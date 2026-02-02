
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Job, Testimonial } from './types';
import { Loader2 } from 'lucide-react';
import { supabase } from './services/supabase';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const JobListing = lazy(() => import('./pages/JobListing'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Auth = lazy(() => import('./pages/Auth'));
const StaticPage = lazy(() => import('./pages/StaticPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AIChatBot = lazy(() => import('./components/AIChatBot'));

const PageLoader = () => (
  <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
    <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-4" />
    <span className="text-[10px] font-black uppercase tracking-widest">Loading...</span>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminSession, setAdminSession] = useState<any>(null);

  // Database States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [siteConfig, setSiteConfig] = useState({
    address: "3rd floor, 58 (03, SN Banerjee Rd, above Luxe Cafe, Barrackpur Cantonment, Kolkata, West Bengal 700120",
    phone: "08777245016",
    email: "consult@jjbrothers.me",
    whatsapp: "+91 87772 45016"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session);
    });

    // Initial Data Fetch
    fetchInitialData();

    return () => subscription.unsubscribe();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [jobsData, reviewsData, configData] = await Promise.all([
        supabase.from('jobs').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('site_config').select('*').eq('id', 1).single()
      ]);

      if (jobsData.data) setJobs(jobsData.data);
      if (reviewsData.data) setTestimonials(reviewsData.data);
      if (configData.data) setSiteConfig(configData.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigate = (page: string, data?: any) => {
    if (page === 'job-detail') {
      setSelectedJob(data as Job);
    }
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-amber-500 mb-6" />
        <h1 className="text-xl font-black uppercase tracking-[0.3em]">JJ Brothers</h1>
        <p className="text-blue-100/40 text-[10px] font-bold uppercase tracking-widest mt-2">Connecting Global Opportunities</p>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} testimonials={testimonials} />;
      case 'jobs':
        return <JobListing onNavigate={navigate} jobs={jobs} />;
      case 'job-detail':
        return selectedJob ? (
          <JobDetail job={selectedJob} onBack={() => navigate('jobs')} />
        ) : <JobListing onNavigate={navigate} jobs={jobs} />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard /> : <Auth onSuccess={() => { setIsLoggedIn(true); navigate('dashboard'); }} />;
      case 'auth':
        return <Auth onSuccess={() => { setIsLoggedIn(true); navigate('dashboard'); }} />;
      case 'admin':
        return adminSession ? (
          <AdminPanel
            jobs={jobs}
            setJobs={setJobs}
            siteConfig={siteConfig}
            setSiteConfig={setSiteConfig}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            onNavigate={navigate}
          />
        ) : (
          <AdminLogin onSuccess={() => navigate('admin')} onNavigate={navigate} />
        );
      case 'migration':
      case 'services':
      case 'contact':
      case 'privacy':
      case 'terms':
      case 'disclaimer':
        return <StaticPage type={currentPage} onNavigate={navigate} siteConfig={siteConfig} />;
      default:
        return <Home onNavigate={navigate} testimonials={testimonials} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        userRole={isLoggedIn ? 'CANDIDATE' : 'GUEST'}
      />

      <main className="flex-grow flex flex-col">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      <Footer onNavigate={navigate} siteConfig={siteConfig} />

      {/* AI Career Assistant */}
      <Suspense fallback={null}>
        <AIChatBot />
      </Suspense>
    </div>
  );
};

export default App;
