import { extendType, nonNull, objectType, stringArg } from "nexus";
import {
  getPollution,
  getPollutionStatus,
} from "../../../services/external/WaqiApi";

export const Pollution = objectType({
  name: "Pollution",
  definition(t) {
    t.float("carbonMonoxide");
    t.float("humidity");
    t.float("nitrogenDioxide");
    t.float("ozone");
    t.float("particulateMatter");
    t.float("particulateMatter10");
    t.float("particulateMatter25");
    t.float("sulfurDioxide");
    t.float("temperature");
    t.float("wind");
    t.float("windGust");
  },
});

export const PollutionStatus = objectType({
  name: "PollutionStatus",
  definition(t) {
    t.string("carbonMonoxide");
    t.string("nitrogenDioxide");
    t.string("ozone");
    t.string("particulateMatter10");
    t.string("particulateMatter25");
    t.string("sulfurDioxide");
    t.string("average");
  },
});

export const PollutionQueries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("pollution", {
      type: "Pollution",
      resolve: () => getPollution(),
    });
    t.field("pollutionStatus", {
      type: "PollutionStatus",
      resolve: () => getPollutionStatus(),
    });
  },
});
