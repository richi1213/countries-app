export const formatPopulation = (population: number): string => {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
