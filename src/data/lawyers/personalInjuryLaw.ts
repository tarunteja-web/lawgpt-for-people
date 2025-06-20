
import type { Lawyer } from './types';

export const personalInjuryLawyers: Lawyer[] = [
  {
    id: '8',
    name: 'Adv. Sunita Rao',
    rating: 4.6,
    fee: 359,
    language: 'Telugu, English',
    specialization: 'Personal Injury Law',
    experience: '11 years',
    initials: 'SR',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    location: 'Vijayawada',
    qualifications: 'LLB, Certificate in Medical Law',
    barCouncilNo: 'AP/2012/89012',
    courtsOfPractice: ['High Court of AP', 'Civil Courts', 'Motor Accident Claims Tribunal'],
    availability: 'available'
  },
  {
    id: '22',
    name: 'Adv. Arjun Patel',
    rating: 4.7,
    fee: 399,
    language: 'Telugu, Hindi, English',
    specialization: 'Personal Injury Law',
    experience: '13 years',
    initials: 'AP',
    profileImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Tort Law), Medical Law Certificate',
    barCouncilNo: 'TS/2010/45678',
    courtsOfPractice: ['High Court of Telangana', 'Civil Courts', 'Motor Accident Claims Tribunal'],
    availability: 'busy'
  }
];
