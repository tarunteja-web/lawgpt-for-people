
import type { Lawyer } from './types';

export const civilLawyers: Lawyer[] = [
  {
    id: '5',
    name: 'Adv. Venkat Rao',
    rating: 4.6,
    fee: 449,
    language: 'Telugu, English',
    specialization: 'Civil Law',
    experience: '20 years',
    initials: 'VR',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Civil Law)',
    barCouncilNo: 'TS/2003/56789',
    courtsOfPractice: ['High Court of Telangana', 'Civil Courts', 'District Courts'],
    availability: 'available'
  },
  {
    id: '15',
    name: 'Adv. Bharath Chandra',
    rating: 4.3,
    fee: 179,
    language: 'Telugu, Urdu, English',
    specialization: 'Civil Law',
    experience: '19 years',
    initials: 'BC',
    profileImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
    location: 'Nizamabad',
    qualifications: 'LLB, LLM (Civil Law)',
    barCouncilNo: 'TS/2004/56789',
    courtsOfPractice: ['High Court of Telangana', 'Civil Courts', 'District Courts'],
    availability: 'available'
  }
];
