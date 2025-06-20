
import type { Lawyer } from './types';

export const immigrationLawyers: Lawyer[] = [
  {
    id: '14',
    name: 'Adv. Rajani Devi',
    rating: 4.5,
    fee: 319,
    language: 'Telugu, Hindi, English',
    specialization: 'Immigration Law',
    experience: '12 years',
    initials: 'RD',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'Guntur',
    qualifications: 'LLB, LLM (Immigration Law)',
    barCouncilNo: 'AP/2011/45678',
    courtsOfPractice: ['High Court of AP', 'Immigration Tribunal', 'Foreigner Tribunal'],
    availability: 'offline'
  },
  {
    id: '25',
    name: 'Adv. Rohit Gupta',
    rating: 4.7,
    fee: 379,
    language: 'Telugu, Hindi, English',
    specialization: 'Immigration Law',
    experience: '10 years',
    initials: 'RG',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Immigration Law), International Law Certificate',
    barCouncilNo: 'TS/2013/56789',
    courtsOfPractice: ['High Court of Telangana', 'Immigration Tribunal', 'Foreigner Tribunal'],
    availability: 'available'
  }
];
