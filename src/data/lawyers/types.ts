
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
  location: string;
  qualifications: string;
  barCouncilNo?: string;
  courtsOfPractice: string[];
  availability: 'available' | 'busy' | 'offline';
}

export interface FeeRange {
  label: string;
  min: number;
  max: number;
}

export interface ExperienceRange {
  label: string;
  min: number;
  max: number;
}
