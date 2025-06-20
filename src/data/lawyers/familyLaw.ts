
import type { Lawyer } from './types';

export const familyLawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Adv. Ravi Kumar Reddy',
    rating: 4.8,
    fee: 299,
    language: 'Telugu, English',
    specialization: 'Family Law',
    experience: '15 years',
    initials: 'RKR',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Family Law)',
    barCouncilNo: 'TS/2008/12345',
    courtsOfPractice: ['High Court of Telangana', 'Family Courts', 'District Courts'],
    availability: 'available'
  },
  {
    id: '6',
    name: 'Adv. Meera Patel',
    rating: 4.8,
    fee: 329,
    language: 'Telugu, Hindi, English',
    specialization: 'Family Law',
    experience: '8 years',
    initials: 'MP',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    location: 'Vijayawada',
    qualifications: 'LLB, Diploma in Family Counseling',
    barCouncilNo: 'AP/2015/67890',
    courtsOfPractice: ['High Court of AP', 'Family Courts', 'District Courts'],
    availability: 'available'
  },
  {
    id: '16',
    name: 'Adv. Anjali Sharma',
    rating: 4.7,
    fee: 379,
    language: 'Telugu, Hindi, English',
    specialization: 'Family Law',
    experience: '12 years',
    initials: 'AS',
    profileImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Family Law), Mediation Certificate',
    barCouncilNo: 'TS/2011/78901',
    courtsOfPractice: ['High Court of Telangana', 'Family Courts', 'Mediation Centers'],
    availability: 'busy'
  },
  {
    id: '17',
    name: 'Adv. Deepak Krishna',
    rating: 4.6,
    fee: 349,
    language: 'Telugu, English',
    specialization: 'Family Law',
    experience: '9 years',
    initials: 'DK',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'Visakhapatnam',
    qualifications: 'LLB, Certificate in Child Psychology',
    barCouncilNo: 'AP/2014/89012',
    courtsOfPractice: ['High Court of AP', 'Family Courts', 'Juvenile Courts'],
    availability: 'available'
  }
];
