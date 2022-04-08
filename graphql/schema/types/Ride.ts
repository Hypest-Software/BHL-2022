import { objectType } from "nexus";

export const Ride = objectType({
  name: "Ride",
  definition(t) {
    t.string("id");
    t.float("start_lat");
    t.float("start_lng");
    t.float("end_lat");
    t.float("end_lng");
    t.float("distance");
    t.string("conveyance");
    t.float("points");

    t.float("air_co");
    t.float("air_no");
    t.float("air_no2");
    t.float("air_o3");
    t.float("air_so2");
    t.float("air_pm2_5");
    t.float("air_pm10");
    t.float("air_nh3");
  },
});
