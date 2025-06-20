
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

export const legalIssueToSpecialization: { [key: string]: string } = {
  'Divorce': 'Family Law',
  'Property Disputes': 'Property Law',
  'Criminal Defense': 'Criminal Law',
  'Business Law': 'Corporate Law',
  'Employment Issues': 'Employment Law',
  'Personal Injury': 'Personal Injury Law',
  'Family Law': 'Family Law',
  'Contract Disputes': 'Civil Law',
  'Tax Issues': 'Tax Law',
  'Intellectual Property': 'IP Law',
  'Immigration': 'Immigration Law',
  'Consumer Rights': 'Consumer Law'
};

export const lawyers: Lawyer[] = [
  // Family Law Lawyers
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
  },

  // Property Law Lawyers
  {
    id: '2',
    name: 'Adv. Priya Sharma',
    rating: 4.9,
    fee: 399,
    language: 'Telugu, Hindi, English',
    specialization: 'Property Law',
    experience: '12 years',
    initials: 'PS',
    profileImage: 'https://images.unsplash.com/photo-1594736022-d5d88e9218df?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Property Law)',
    barCouncilNo: 'TS/2011/23456',
    courtsOfPractice: ['High Court of Telangana', 'Revenue Courts', 'Civil Courts'],
    availability: 'available'
  },
  {
    id: '10',
    name: 'Adv. Kavitha Reddy',
    rating: 4.7,
    fee: 289,
    language: 'Telugu, English',
    specialization: 'Property Law',
    experience: '9 years',
    initials: 'KR',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    location: 'Visakhapatnam',
    qualifications: 'LLB, LLM (Property Law)',
    barCouncilNo: 'AP/2014/01234',
    courtsOfPractice: ['High Court of AP', 'Revenue Courts', 'Civil Courts'],
    availability: 'busy'
  },
  {
    id: '18',
    name: 'Adv. Rajesh Agarwal',
    rating: 4.8,
    fee: 429,
    language: 'Telugu, Hindi, English',
    specialization: 'Property Law',
    experience: '16 years',
    initials: 'RA',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Property Law), Diploma in Real Estate',
    barCouncilNo: 'TS/2007/90123',
    courtsOfPractice: ['High Court of Telangana', 'Revenue Courts', 'Civil Courts', 'RERA'],
    availability: 'available'
  },

  // Criminal Law Lawyers
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
  },

  // Corporate Law Lawyers
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
  },

  // Employment Law Lawyers
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
  },

  // Personal Injury Law Lawyers
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
  },

  // Civil Law Lawyers
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
  },

  // Tax Law Lawyers
  {
    id: '11',
    name: 'Adv. Prakash Sharma',
    rating: 4.6,
    fee: 199,
    language: 'Telugu, Hindi, English',
    specialization: 'Tax Law',
    experience: '13 years',
    initials: 'PS',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Warangal',
    qualifications: 'LLB, LLM (Tax Law), CA',
    barCouncilNo: 'TS/2010/12345',
    courtsOfPractice: ['High Court of Telangana', 'Income Tax Appellate Tribunal', 'GST Tribunal'],
    availability: 'available'
  },
  {
    id: '23',
    name: 'Adv. Neha Agarwal',
    rating: 4.8,
    fee: 439,
    language: 'Telugu, Hindi, English',
    specialization: 'Tax Law',
    experience: '17 years',
    initials: 'NA',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (Tax Law), CA, CPA',
    barCouncilNo: 'TS/2006/78901',
    courtsOfPractice: ['High Court of Telangana', 'ITAT', 'GST Tribunal', 'Customs Tribunal'],
    availability: 'available'
  },

  // IP Law Lawyers
  {
    id: '13',
    name: 'Adv. Mahesh Kumar',
    rating: 4.4,
    fee: 229,
    language: 'Telugu, English',
    specialization: 'IP Law',
    experience: '6 years',
    initials: 'MK',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    location: 'Guntur',
    qualifications: 'LLB, LLM (IP Law), Patent Agent',
    barCouncilNo: 'AP/2017/34567',
    courtsOfPractice: ['High Court of AP', 'IP Appellate Board', 'Commercial Courts'],
    availability: 'available'
  },
  {
    id: '24',
    name: 'Adv. Divya Krishnan',
    rating: 4.9,
    fee: 489,
    language: 'Telugu, Tamil, English',
    specialization: 'IP Law',
    experience: '15 years',
    initials: 'DK',
    profileImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
    location: 'Hyderabad',
    qualifications: 'LLB, LLM (IP Law), Patent Agent, PhD in IP Law',
    barCouncilNo: 'TS/2008/23456',
    courtsOfPractice: ['High Court of Telangana', 'IPAB', 'Commercial Courts', 'Delhi High Court IP Division'],
    availability: 'available'
  },

  // Immigration Law Lawyers
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
  },

  // Consumer Law Lawyers
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

export const cities = ['All', 'Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Warangal', 'Guntur', 'Nizamabad'];

export const feeRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹200', min: 0, max: 200 },
  { label: '₹200 - ₹300', min: 200, max: 300 },
  { label: '₹300 - ₹400', min: 300, max: 400 },
  { label: 'Above ₹400', min: 400, max: Infinity }
];

export const experienceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: '0-5 years', min: 0, max: 5 },
  { label: '5-10 years', min: 5, max: 10 },
  { label: '10-15 years', min: 10, max: 15 },
  { label: '15+ years', min: 15, max: Infinity }
];
