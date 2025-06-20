
import type { Lawyer } from './types';

export const criminalLawyers: Lawyer[] = [
  {
    id: '3',
    name: 'Adv. Suresh Reddy',
    rating: 4.7,
    fee: 349,
    language: 'Telugu, English',
    specialization: 'Criminal Law',
    experience: '18 years',
    initials: 'SR',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Criminal Law)',
    barCouncilNo: 'TS/2005/34567',
    courtsOfPractice: ['High Court of Telangana', 'Sessions Courts', 'Magistrate Courts'],
    availability: 'busy'
  },
  {
    id: '9',
    name: 'Adv. Ramesh Babu',
    rating: 4.5,
    fee: 249,
    language: 'Telugu, English',
    specialization: 'Criminal Law',
    experience: '16 years',
    initials: 'RB',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    location: 'Visakhapatnam',
    qualifications: 'LLB, Diploma in Criminology',
    barCouncilNo: 'AP/2007/90123',
    courtsOfPractice: ['High Court of AP', 'Sessions Courts', 'Magistrate Courts'],
    availability: 'available'
  },
  {
    id: '19',
    name: 'Adv. Sanjay Kumar',
    rating: 4.9,
    fee: 459,
    language: 'Telugu, Hindi, English',
    specialization: 'Criminal Law',
    experience: '22 years',
    initials: 'SK',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Criminal Law), Senior Advocate',
    barCouncilNo: 'TS/2001/12345',
    courtsOfPractice: ['Supreme Court', 'High Court of Telangana', 'Sessions Courts'],
    availability: 'available'
  }
];
