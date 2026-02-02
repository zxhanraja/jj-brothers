
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
  <div className="fixed top-0 left-0 right-0 h-1 z-[10001] bg-slate-900 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
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
  const [componentReady, setComponentReady] = useState(false);

  useEffect(() => {
    // Check for existing admin session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session);
    });

    // Initial Data & Component Fetch
    const init = async () => {
      try {
        await Promise.all([
          fetchInitialData(),
          // Eagerly load Home to avoid Suspense flash on first render
          import('./pages/Home')
        ]);
      } catch (err) {
        console.error("Init Error:", err);
      } finally {
        setComponentReady(true);
        // Small delay for smooth exit
        setTimeout(() => setLoading(false), 800);
      }
    };

    init();

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

  if (loading || !componentReady) {
    return (
      <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-1000">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-[60px] opacity-20 animate-pulse"></div>
          <Loader2 className="w-16 h-16 animate-spin text-amber-500 relative z-10" />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-[0.4em]">JJ Brothers</h1>
        <div className="w-48 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
        <p className="text-blue-100/40 text-[11px] font-bold uppercase tracking-[0.3em] mt-8">Global Career Pathways</p>
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
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        userRole={isLoggedIn ? 'CANDIDATE' : 'GUEST'}
      />

      <div className={`flex flex-col min-h-screen ${loading ? 'overflow-hidden' : 'smooth-entry'}`}>
        <main className="flex-grow flex flex-col pt-[72px]">
          <Suspense fallback={<PageLoader />}>
            {renderPage()}
          </Suspense>
        </main>

        <Footer onNavigate={navigate} siteConfig={siteConfig} />
      </div>

      {/* AI Career Assistant */}
      <Suspense fallback={null}>
        <AIChatBot />
      </Suspense>
    </>
  );
};

export default App;
