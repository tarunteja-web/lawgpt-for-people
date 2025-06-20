
import type { Lawyer } from './types';

export const consumerLawyers: Lawyer[] = [
  {
    id: '12',
    name: 'Adv. Sita Mahalakshmi',
    rating: 4.8,
    fee: 269,
    language: 'Telugu, English',
    specialization: 'Consumer Law',
    experience: '7 years',
    initials: 'SM',
    profileImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
    location: 'Warangal',
    qualifications: 'LLB, Diploma in Consumer Protection',
    barCouncilNo: 'TS/2016/23456',
    courtsOfPractice: ['District Consumer Forum', 'State Consumer Commission', 'Civil Courts'],
    availability: 'available'
  },
  {
    id: '26',
    name: 'Adv. Kiran Kumar',
    rating: 4.6,
    fee: 299,
    language: 'Telugu, Kannada, English',
    specialization: 'Consumer Law',
    experience: '9 years',
    initials: 'KK',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    location: 'Vijayawada',
    qualifications: 'LLB, LLM (Consumer Law), Consumer Rights Advocate',
    barCouncilNo: 'AP/2014/67890',
    courtsOfPractice: ['District Consumer Forum', 'State Consumer Commission', 'National Consumer Commission'],
    availability: 'busy'
  }
];
