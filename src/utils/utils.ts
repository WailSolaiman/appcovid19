export type TotalStatistics = {
  country: string;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  };
  deaths: {
    new: number | null;
    total: number;
  };
  tests: {
    total: number;
  };
  day: Date;
  time: Date;
};

export const getAllConfirmedCases = (totals: TotalStatistics[]): string => {
  const confirmedCases: number[] = totals.map((item) => item.cases.active);
  const confirmed = confirmedCases.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
  return confirmed.toLocaleString("en");
};

export const getAllCriticalCases = (totals: TotalStatistics[]): string => {
  const criticalCases: number[] = totals.map((item) => item.cases.critical);
  const critical = criticalCases.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
  return critical.toLocaleString("en");
};

export const getAllRecoveredCases = (totals: TotalStatistics[]): string => {
  const recoveredCases: number[] = totals.map((item) => item.cases.recovered);
  const recovered = recoveredCases.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
  return recovered.toLocaleString("en");
};

export const getAllDeathsCases = (totals: TotalStatistics[]): string => {
  const deathsCases: number[] = totals.map((item) => item.deaths.total);
  const deaths = deathsCases.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
  return deaths.toLocaleString("en");
};
