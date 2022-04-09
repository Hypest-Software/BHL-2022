import { getWaqi } from "./WaqiRawApi";

export interface Pollution {
  carbonMonoxide: number;
  humidity: number;
  nitrogenDioxide: number;
  ozone: number;
  particulateMatter: number;
  particulateMatter10: number;
  particulateMatter25: number;
  sulfurDioxide: number;
  temperature: number;
  wind: number;
  windGust: number;
}

export const getPollution = async (): Promise<Pollution> => {
  const raw = await getWaqi();

  return {
    carbonMonoxide: raw.data.iaqi.co.v,
    humidity: raw.data.iaqi.h.v,
    nitrogenDioxide: raw.data.iaqi.no2.v,
    ozone: raw.data.iaqi.o3.v,
    particulateMatter: raw.data.iaqi.p.v,
    particulateMatter10: raw.data.iaqi.pm10.v,
    particulateMatter25: raw.data.iaqi.pm25.v,
    sulfurDioxide: raw.data.iaqi.so2.v,
    temperature: raw.data.iaqi.t.v,
    wind: raw.data.iaqi.w.v,
    windGust: raw.data.iaqi.wg.v,
  };
};

export enum PollutionStatus {
  Good = "GOOD",
  Fair = "FAIR",
  Poor = "POOR",
  VeryPoor = "VERY_POOR",
  ExtremelyPoor = "EXTREMELY_POOR",
}

const statusRanges = (
  value: number,
  table: Map<PollutionStatus, { min: number; max: number }>
): PollutionStatus => {
  for (const [status, { min, max }] of table.entries()) {
    if (value >= min && value <= max) {
      return status;
    }
  }
  return PollutionStatus.Good;
};

export const carbonMonoxiteStatus = (
  carbonMonoxite: number
): PollutionStatus => {
  return statusRanges(
    carbonMonoxite,
    new Map([
      [PollutionStatus.Good, { min: 0, max: 30 }],
      [PollutionStatus.Poor, { min: 30, max: 70 }],
      [PollutionStatus.ExtremelyPoor, { min: 70, max: Infinity }],
    ])
  );
};

export const nitrogenDioxideStatus = (
  nitrogenDioxide: number
): PollutionStatus => {
  return statusRanges(
    nitrogenDioxide,
    new Map([
      [PollutionStatus.Good, { min: 0, max: 60 }],
      [PollutionStatus.Fair, { min: 60, max: 120 }],
      [PollutionStatus.Poor, { min: 120, max: 180 }],
      [PollutionStatus.VeryPoor, { min: 180, max: 360 }],
      [PollutionStatus.ExtremelyPoor, { min: 360, max: Infinity }],
    ])
  );
};

export const ozoneStatus = (ozone: number): PollutionStatus => {
  return statusRanges(
    ozone,
    new Map([
      [PollutionStatus.Good, { min: 0, max: 50 }],
      [PollutionStatus.Fair, { min: 50, max: 100 }],
      [PollutionStatus.Poor, { min: 100, max: 150 }],
      [PollutionStatus.VeryPoor, { min: 150, max: 300 }],
      [PollutionStatus.ExtremelyPoor, { min: 300, max: Infinity }],
    ])
  );
};

export const particulateMatter10Status = (
  particulateMatter: number
): PollutionStatus => {
  return statusRanges(
    particulateMatter,
    new Map([
      [PollutionStatus.Good, { min: 0, max: 40 }],
      [PollutionStatus.Fair, { min: 40, max: 80 }],
      [PollutionStatus.Poor, { min: 80, max: 120 }],
      [PollutionStatus.VeryPoor, { min: 120, max: 300 }],
      [PollutionStatus.ExtremelyPoor, { min: 300, max: Infinity }],
    ])
  );
};

export const particulateMatter25Status = (
  particulateMatter: number
): PollutionStatus => {
  return statusRanges(
    particulateMatter,
    new Map([
      [PollutionStatus.Good, { min: 0, max: 12.5 }],
      [PollutionStatus.Fair, { min: 12.5, max: 25 }],
      [PollutionStatus.Poor, { min: 25, max: 50 }],
      [PollutionStatus.VeryPoor, { min: 50, max: 150 }],
      [PollutionStatus.ExtremelyPoor, { min: 150, max: Infinity }],
    ])
  );
};

export const sulfurDioxideStatus = (sulfurDioxide: number): PollutionStatus => {
  return statusRanges(
    sulfurDioxide,
    new Map([
      [PollutionStatus.Good, { min: 0, max: 100 }],
      [PollutionStatus.Fair, { min: 100, max: 200 }],
      [PollutionStatus.Poor, { min: 200, max: 300 }],
      [PollutionStatus.VeryPoor, { min: 300, max: 600 }],
      [PollutionStatus.ExtremelyPoor, { min: 600, max: Infinity }],
    ])
  );
};

const statusToInt = (status: PollutionStatus): number => {
  switch (status) {
    case PollutionStatus.Good:
      return 1;
    case PollutionStatus.Fair:
      return 2;
    case PollutionStatus.Poor:
      return 3;
    case PollutionStatus.VeryPoor:
      return 4;
    case PollutionStatus.ExtremelyPoor:
      return 5;
    default:
      return 0;
  }
};

const averageStatus = (pollution: PollutionStatus[]): PollutionStatus => {
  const sum = pollution.reduce((acc, curr) => acc + statusToInt(curr), 0);
  const avg = sum / pollution.length;
  switch (avg) {
    case 1:
      return PollutionStatus.Good;
    case 2:
      return PollutionStatus.Fair;
    case 3:
      return PollutionStatus.Poor;
    case 4:
      return PollutionStatus.VeryPoor;
    case 5:
      return PollutionStatus.ExtremelyPoor;
    default:
      return PollutionStatus.Good;
  }
};

export interface PollutionStatuses {
  carbonMonoxide: PollutionStatus;
  nitrogenDioxide: PollutionStatus;
  ozone: PollutionStatus;
  particulateMatter10: PollutionStatus;
  particulateMatter25: PollutionStatus;
  sulfurDioxide: PollutionStatus;
  average: PollutionStatus;
}

export const getPollutionStatus = async (): Promise<PollutionStatuses> => {
  const pollution = await getPollution();

  const carbonMonoxide = carbonMonoxiteStatus(pollution.carbonMonoxide);
  const nitrogenDioxide = nitrogenDioxideStatus(pollution.nitrogenDioxide);
  const ozone = ozoneStatus(pollution.ozone);
  const particulateMatter10 = particulateMatter10Status(
    pollution.particulateMatter10
  );
  const particulateMatter25 = particulateMatter25Status(
    pollution.particulateMatter25
  );
  const sulfurDioxide = sulfurDioxideStatus(pollution.sulfurDioxide);
  const average = averageStatus([
    carbonMonoxide,
    nitrogenDioxide,
    ozone,
    particulateMatter10,
    particulateMatter25,
    sulfurDioxide,
  ]);
  return {
    carbonMonoxide,
    nitrogenDioxide,
    ozone,
    particulateMatter10,
    particulateMatter25,
    sulfurDioxide,
    average,
  };
};
