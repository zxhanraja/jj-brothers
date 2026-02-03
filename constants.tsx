
import { Job, JobType, ExperienceLevel, Company } from './types';

export const CATEGORIES = [
  'Engineering', 'Information Technology', 'Hospitality', 'Healthcare',
  'Finance', 'Marketing', 'Education', 'Construction', 'Retail'
];

export const GULF_LOCATIONS = [
  { name: 'Dubai', country: 'UAE', code: 'AE' },
  { name: 'Abu Dhabi', country: 'UAE', code: 'AE' },
  { name: 'Riyadh', country: 'Saudi Arabia', code: 'SA' },
  { name: 'Jeddah', country: 'Saudi Arabia', code: 'SA' },
  { name: 'Doha', country: 'Qatar', code: 'QA' },
  { name: 'Kuwait City', country: 'Kuwait', code: 'KW' },
  { name: 'Muscat', country: 'Oman', code: 'OM' },
  { name: 'Manama', country: 'Bahrain', code: 'BH' },
  { name: 'Baghdad', country: 'Iraq', code: 'IQ' },
  { name: 'Amman', country: 'Jordan', code: 'JO' },
  { name: 'Cairo', country: 'Egypt', code: 'EG' },
  { name: 'Istanbul', country: 'Turkey', code: 'TR' }
];

export const EUROPE_HOT_JOBS = [
  {
    country: 'Croatia',
    code: 'HR',
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=400',
    description: 'Seize the golden opportunity and succeed in the elevator industry of Croatia.',
    roles: ['Assistant Elevator Technician', 'Lead Elevator Technician']
  },
  {
    country: 'Bosnia',
    code: 'BA',
    image: 'https://images.unsplash.com/photo-1560067174-c5a3a8f37060?auto=format&fit=crop&q=80&w=400',
    description: 'We are excited to offer exclusive job placements in Bosnia across multiple sectors.',
    roles: ['Pastry Chef', 'House Master', 'Retail Worker', 'Bartender', 'Mason']
  }
];

export const TRUST_STATS = [
  { label: 'Offices Worldwide', value: '2+' },
  { label: 'Team Members', value: '50+' },
  { label: 'Visa Processed', value: '7035+' },
  { label: 'Countries Served', value: '21+' }
];

export const SERVICED_COUNTRIES = [
  { name: 'Albania', code: 'AL' }, { name: 'Australia', code: 'AU' }, { name: 'Bosnia', code: 'BA' }, { name: 'Bulgaria', code: 'BG' },
  { name: 'Canada', code: 'CA' }, { name: 'Croatia', code: 'HR' }, { name: 'Czechia', code: 'CZ' }, { name: 'Germany', code: 'DE' },
  { name: 'Lithuania', code: 'LT' }, { name: 'Malta', code: 'MT' }, { name: 'New Zealand', code: 'NZ' }, { name: 'Norway', code: 'NO' },
  { name: 'Portugal', code: 'PT' }, { name: 'Romania', code: 'RO' }, { name: 'Serbia', code: 'RS' }, { name: 'Slovakia', code: 'SK' },
  { name: 'United Kingdom', code: 'GB' }
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer (React/Node)',
    companyId: 'c1',
    companyName: 'Emirates Tech',
    companyLogo: 'https://picsum.photos/seed/tech/100/100',
    location: 'Dubai, UAE',
    salary: '$8,000 - $12,000',
    type: JobType.FULL_TIME,
    experience: ExperienceLevel.SENIOR,
    description: 'We are looking for a highly skilled React developer to lead our fintech platform development.',
    requirements: ['5+ years React', 'Node.js mastery', 'Cloud experience'],
    postedAt: '2024-05-15',
    category: 'Information Technology',
    featured: true
  },
  {
    id: '2',
    title: 'Project Manager - Construction',
    companyId: 'c2',
    companyName: 'Riyadh Holdings',
    companyLogo: 'https://picsum.photos/seed/riyadh/100/100',
    location: 'Riyadh, Saudi Arabia',
    salary: '$7,000 - $10,000',
    type: JobType.FULL_TIME,
    experience: ExperienceLevel.MID,
    description: 'Manage large-scale residential projects in the heart of Riyadh.',
    requirements: ['Civil Engineering degree', 'PMP Certification', 'Arabic fluency'],
    postedAt: '2024-05-18',
    category: 'Construction',
    featured: true
  }
];
export const FAQS = [
  {
    question: "How long does the visa process typically take?",
    answer: "The duration varies by country and job type. Typically, Gulf visas are processed in 30-45 days, while European work permits may take 2-4 months. We provide real-time updates through our dedicated tracking system."
  },
  {
    question: "Do you provide job placement in countries other than the Gulf and Europe?",
    answer: "Yes, we also have significant experience in placements for Canada and Australia, particularly in healthcare, engineering, and IT sectors. We are expanding our network to other regions as well."
  },
  {
    question: "What documents are required to start my application?",
    answer: "Initially, we need your updated resume, passport copy (front & back), and educational certificates. Depending on the job and country, additional documents like experience letters or PCC (Police Clearance Certificate) may be required later."
  },
  {
    question: "Are your job placements legally verified?",
    answer: "Absolutely. We pride ourselves on 100% legal transparency. Every job we offer is verified through official channels, ensuring full compliance with both Indian and international labor laws."
  },
  {
    question: "Do you assist with housing and settling in the new country?",
    answer: "Yes, our commitment doesn't end with a visa. We provide 'landing support' which includes assistance with finding accommodation, local transportation guidance, and help with initial documentation in the host country."
  },
  {
    question: "How do I evaluate my profile for international opportunities?",
    answer: "You can request a free profile evaluation through our website or visit our head office. Our experts will assess your skills and experience to match you with the best-paying global markets."
  }
];
