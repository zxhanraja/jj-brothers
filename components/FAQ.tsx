import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 lg:py-32 px-6 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50 text-blue-600 rounded-full mb-4">
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Frequent Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
                        Got Questions? <br />
                        <span className="text-blue-600">We've Got Answers.</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                        Everything you need to know about our recruitment process and global career opportunities.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className={`group border rounded-[2rem] transition-all duration-300 ${openIndex === index
                                    ? 'border-blue-200 bg-blue-50/30'
                                    : 'border-slate-100 bg-white hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-8 py-7 flex items-center justify-between gap-4 focus:outline-none"
                            >
                                <span className={`text-lg font-black tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                                    }`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-8 pb-8 pt-0">
                                    <div className="w-12 h-1 bg-blue-200 rounded-full mb-6"></div>
                                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-10 md:p-12 bg-slate-950 rounded-[3rem] text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">Still have queries?</h3>
                        <p className="text-slate-400 font-medium mb-10 max-w-lg mx-auto">
                            Our team of experts is available 24/7 to assist you with your international career journey.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-10 py-5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">
                                Talk to an expert
                            </button>
                            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">
                                Visit our office
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
