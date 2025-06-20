
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
