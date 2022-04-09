import { particulateMatter10Status, PollutionStatus } from "./WaqiApi";

const getPointsMultiplier = (pm10: number): number => {
  const pm10Status = particulateMatter10Status(pm10);
  switch (pm10Status) {
    case PollutionStatus.Good:
      return 1;
    case PollutionStatus.Fair:
      return 1.5;
    case PollutionStatus.Poor:
      return 2;
    case PollutionStatus.VeryPoor:
      return 2.5;
    case PollutionStatus.ExtremelyPoor:
      return 3;
    default:
      return 1;
  }
};

export const calculatePoints = (
  distance: number,
  particulateMatter10: number
): number => {
  const multiplier = getPointsMultiplier(particulateMatter10);
  return (distance / 1000) * multiplier * 0.05;
};
