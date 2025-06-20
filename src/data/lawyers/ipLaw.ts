
import type { Lawyer } from './types';

export const ipLawyers: Lawyer[] = [
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
  }
];
