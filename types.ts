
export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  REMOTE = 'Remote',
  FREELANCE = 'Freelance'
}

export enum ExperienceLevel {
  ENTRY = 'Entry Level',
  MID = 'Mid Level',
  SENIOR = 'Senior Level',
  EXECUTIVE = 'Executive'
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  website: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: JobType;
  experience: ExperienceLevel;
  description: string;
  requirements: string[];
  postedAt: string;
  category: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  isVerified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';
  avatar?: string;
}

export interface SearchFilters {
  keyword: string;
  location: string;
  category: string;
  type: JobType[];
  experience: ExperienceLevel[];
}
