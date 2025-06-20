
export interface Lawyer {
  id: string;
  name: string;
  rating: number;
  fee: number;
  language: string;
  specialization: string;
  experience: string;
  initials: string;
  profileImage: string;
}

export const legalIssueToSpecialization: { [key: string]: string } = {
  'Divorce': 'Family Law',
  'Property Disputes': 'Property Law',
  'Criminal Defense': 'Criminal Law',
  'Business Law': 'Corporate Law',
  'Employment Issues': 'Employment Law',
  'Personal Injury': 'Personal Injury Law',
  'Family Law': 'Family Law',
  'Contract Disputes': 'Civil Law'
};

export const lawyers: Lawyer[] = [
  {
    id: '1',
    name: 'Adv. Ravi Kumar',
    rating: 4.8,
    fee: 299,
    language: 'Telugu',
    specialization: 'Family Law',
    experience: '15 years',
    initials: 'RK',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Adv. Priya Sharma',
    rating: 4.9,
    fee: 399,
    language: 'Telugu',
    specialization: 'Property Law',
    experience: '12 years',
    initials: 'PS',
    profileImage: 'https://images.unsplash.com/photo-1594736022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Adv. Suresh Reddy',
    rating: 4.7,
    fee: 349,
    language: 'Telugu',
    specialization: 'Criminal Law',
    experience: '18 years',
    initials: 'SR',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Adv. Lakshmi Devi',
    rating: 4.9,
    fee: 299,
    language: 'Telugu',
    specialization: 'Corporate Law',
    experience: '10 years',
    initials: 'LD',
    profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Adv. Venkat Rao',
    rating: 4.6,
    fee: 449,
    language: 'Telugu',
    specialization: 'Civil Law',
    experience: '20 years',
    initials: 'VR',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Adv. Meera Patel',
    rating: 4.8,
    fee: 329,
    language: 'Telugu',
    specialization: 'Family Law',
    experience: '8 years',
    initials: 'MP',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '7',
    name: 'Adv. Kumar Singh',
    rating: 4.7,
    fee: 379,
    language: 'Telugu',
    specialization: 'Employment Law',
    experience: '14 years',
    initials: 'KS',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '8',
    name: 'Adv. Sunita Rao',
    rating: 4.6,
    fee: 359,
    language: 'Telugu',
    specialization: 'Personal Injury Law',
    experience: '11 years',
    initials: 'SR',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  }
];
