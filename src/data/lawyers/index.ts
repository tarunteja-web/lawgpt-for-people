
import { familyLawyers } from './familyLaw';
import { propertyLawyers } from './propertyLaw';
import { criminalLawyers } from './criminalLaw';
import { corporateLawyers } from './corporateLaw';
import { employmentLawyers } from './employmentLaw';
import { personalInjuryLawyers } from './personalInjuryLaw';
import { civilLawyers } from './civilLaw';
import { taxLawyers } from './taxLaw';
import { ipLawyers } from './ipLaw';
import { immigrationLawyers } from './immigrationLaw';
import { consumerLawyers } from './consumerLaw';

export * from './types';
export * from './constants';

// Combine all lawyers into a single array
export const lawyers = [
  ...familyLawyers,
  ...propertyLawyers,
  ...criminalLawyers,
  ...corporateLawyers,
  ...employmentLawyers,
  ...personalInjuryLawyers,
  ...civilLawyers,
  ...taxLawyers,
  ...ipLawyers,
  ...immigrationLawyers,
  ...consumerLawyers
];
