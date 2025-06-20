
import type { Lawyer } from './types';

export const corporateLawyers: Lawyer[] = [
  {
    id: '4',
    name: 'Adv. Lakshmi Devi',
    rating: 4.9,
    fee: 299,
    language: 'Telugu, English',
    specialization: 'Corporate Law',
    experience: '10 years',
    initials: 'LD',
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Corporate Law), Company Secretary',
    barCouncilNo: 'TS/2013/45678',
    courtsOfPractice: ['High Court of Telangana', 'Company Law Board', 'Arbitration'],
    availability: 'available'
  },
  {
    id: '20',
    name: 'Adv. Vikram Singh',
    rating: 4.6,
    fee: 549,
    language: 'Telugu, Hindi, English',
    specialization: 'Corporate Law',
    experience: '14 years',
    initials: 'VS',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Corporate Law), MBA',
    barCouncilNo: 'TS/2009/67890',
    courtsOfPractice: ['High Court of Telangana', 'NCLT', 'Arbitration'],
    availability: 'offline'
  }
];
