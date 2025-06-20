
import type { Lawyer } from './types';

export const employmentLawyers: Lawyer[] = [
  {
    id: '7',
    name: 'Adv. Kumar Singh',
    rating: 4.7,
    fee: 379,
    language: 'Telugu, Hindi, English',
    specialization: 'Employment Law',
    experience: '14 years',
    initials: 'KS',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Vijayawada',
    qualifications: 'LLB, LLM (Labour Law)',
    barCouncilNo: 'AP/2009/78901',
    courtsOfPractice: ['High Court of AP', 'Labour Courts', 'Industrial Tribunals'],
    availability: 'offline'
  },
  {
    id: '21',
    name: 'Adv. Sushma Reddy',
    rating: 4.5,
    fee: 329,
    language: 'Telugu, English',
    specialization: 'Employment Law',
    experience: '11 years',
    initials: 'SR',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Labour Law), HR Certification',
    barCouncilNo: 'TS/2012/34567',
    courtsOfPractice: ['High Court of Telangana', 'Labour Courts', 'Industrial Tribunals'],
    availability: 'available'
  }
];
