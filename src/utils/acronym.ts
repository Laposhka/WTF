import { Acronym } from '@/interfaces/acronym.interface';

export const convertToObject = (acronyms: Acronym[]) => {
  const results: Object[] = [];
  acronyms.forEach(ele => {
    results.push({
      [ele.acronym]: ele.definition,
    });
  });

  return results;
};
