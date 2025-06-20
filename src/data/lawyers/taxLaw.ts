
import type { Lawyer } from './types';

export const taxLawyers: Lawyer[] = [
  {
    id: '11',
    name: 'Adv. Prakash Sharma',
    rating: 4.6,
    fee: 199,
    language: 'Telugu, Hindi, English',
    specialization: 'Tax Law',
    experience: '13 years',
    initials: 'PS',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Warangal',
    qualifications: 'LLB, LLM (Tax Law), CA',
    barCouncilNo: 'TS/2010/12345',
    courtsOfPractice: ['High Court of Telangana', 'Income Tax Appellate Tribunal', 'GST Tribunal'],
    availability: 'available'
  },
  {
    id: '23',
    name: 'Adv. Neha Agarwal',
    rating: 4.8,
    fee: 439,
    language: 'Telugu, Hindi, English',
    specialization: 'Tax Law',
    experience: '17 years',
    initials: 'NA',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Tax Law), CA, CPA',
    barCouncilNo: 'TS/2006/78901',
    courtsOfPractice: ['High Court of Telangana', 'ITAT', 'GST Tribunal', 'Customs Tribunal'],
    availability: 'available'
  }
];
