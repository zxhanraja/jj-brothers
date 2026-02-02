
import React from 'react';
import { 
  ChevronRight, ChevronLeft, Shield, Globe, Mail, MapPin, 
  CheckCircle, Award
} from 'lucide-react';

interface StaticPageProps {
  type: string;
  onNavigate: (page: string) => void;
  siteConfig: any;
}

const StaticPage: React.FC<StaticPageProps> = ({ type, onNavigate, siteConfig }) => {
  const getContent = () => {
    switch (type) {
      case 'migration':
        return {
          title: "Migration Services",
          subtitle: "Premium pathways for skilled Indian talent.",
          icon: Globe,
          sections: [
            {
              title: "Canada Express Entry",
              content: "Our certified consultants guide you through the FSW and PNP pathways with expert precision.",
              points: ["Point Assessment", "ECA/WES Support", "Filing & ITAs", "Pre-landing Briefing"]
            },
            {
              title: "European Work Permits",
              content: "Direct work permit filings for Croatia, Malta, and Slovenia's growing sectors.",
              points: ["Employer Sourcing", "Visa Documentation", "Embryo Support", "Housing Guidance"]
            }
          ]
        };
      case 'services':
        return {
          title: "Our Expertise",
          subtitle: "Comprehensive support for global career excellence.",
          icon: Award,
          sections: [
            {
              title: "Career Branding",
              content: "We transform your profile into a globally competitive brand.",
              points: ["ATS-Ready Resumes", "LinkedIn Mastery", "Video CV Coaching", "Psychometric Testing"]
            },
            {
              title: "Visa Legalities",
              content: "Leave the complex paperwork to our seasoned legal experts.",
              points: ["Document Apostille", "Verification Services", "Medical Guidance", "Embassy Interviews"]
            }
          ]
        };
      case 'contact':
        return {
          title: "Get In Touch",
          subtitle: "Our headquarters is ready to assist you.",
          icon: Mail,
          sections: [
            {
              title: "VISIT OUR OFFICE",
              content: "Walk-in evaluations and career counseling sessions available at our head office.",
              points: [
                siteConfig.address,
                "Mon - Sat: 10:00 AM - 07:00 PM"
              ]
            },
            {
              title: "DIRECT CONNECT",
              content: "Reach our advisory team for immediate profile evaluations or status updates.",
              points: [
                `Phone: ${siteConfig.phone}`,
                `Email: ${siteConfig.email}`,
                `WhatsApp: ${siteConfig.whatsapp}`,
                "Live Career Support"
              ]
            }
          ]
        };
      default:
        return {
          title: "Policy & Information",
          subtitle: "Transparent guidelines for a secure journey.",
          icon: Shield,
          sections: [
            {
              title: "Privacy & Security",
              content: "Your data is protected with enterprise-grade encryption.",
              points: ["GDPR Compliant", "No Data Selling", "Secure Vault Storage", "Access Control"]
            },
            {
              title: "Fraud Prevention",
              content: "We follow ethical hiring standards as per Indian & Global laws.",
              points: ["No Personal Payments", "Official Email Only", "Verified Job Offers", "Direct Employer Hire"]
            }
          ]
        };
    }
  };

  const data = getContent();

  return (
    <div className="pt-24 md:pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
           <button onClick={() => onNavigate('home')} className="hover:text-blue-900 transition-colors">Home</button>
           <ChevronRight className="w-3 h-3" />
           <span className="text-slate-900 font-black truncate">{data.title.toUpperCase()}</span>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-20">
            {/* Icon Box */}
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-md">
              <data.icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-6 leading-tight tracking-tighter">
              {data.title}
            </h1>
            <p className="text-base md:text-lg font-bold text-blue-600 mb-12 md:mb-16 tracking-tight leading-relaxed">
              {data.subtitle}
            </p>
            
            <div className="space-y-12 md:space-y-16">
              {data.sections.map((section, idx) => (
                <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  {/* Section title with Orange Dash */}
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                     <div className="w-8 h-1 md:w-10 md:h-1.5 bg-amber-500 rounded-full"></div>
                     <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-widest">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="bg-white">
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8 font-medium">
                      {section.content}
                    </p>
                    
                    {section.points.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {section.points.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 bg-slate-50 rounded-2xl border border-slate-100/50 hover:bg-slate-100 transition-colors">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 md:w-3.5 h-3 md:h-3.5" />
                            </div>
                            <span className="text-[9px] md:text-[10px] font-black text-slate-700 uppercase tracking-wider leading-normal">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 md:mt-20 pt-8 md:pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8">
              <button 
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-3 text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-widest hover:text-blue-900 transition-all group order-2 sm:order-1"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                Back to Home
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto bg-blue-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl active:scale-95 order-1 sm:order-2"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
