import axios from "axios";

const token = process.env.WAQI_TOKEN;

export const getWaqi = async () => {
  const res = await axios.get<Waqi>(
    `https://api.waqi.info/feed/warsaw/?token=${token}`
  );
  return res.data;
};

export interface Waqi {
  status: string;
  data: WaqiData;
}

export interface WaqiData {
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: City;
  dominentpol: string;
  iaqi: Iaqi;
  time: Time;
  forecast: Forecast;
  debug: Debug;
}

export interface Attribution {
  url: string;
  name: string;
  logo?: string;
}

export interface City {
  geo: number[];
  name: string;
  url: string;
  location: string;
}

export interface Debug {
  sync: Date;
}

export interface Forecast {
  daily: Daily;
}

export interface Daily {
  o3: ForecastValue[];
  pm10: ForecastValue[];
  pm25: ForecastValue[];
  uvi: ForecastValue[];
}

export interface ForecastValue {
  avg: number;
  day: Date;
  max: number;
  min: number;
}

export interface Iaqi {
  co: CurrentValue;
  h: CurrentValue;
  no2: CurrentValue;
  o3: CurrentValue;
  p: CurrentValue;
  pm10: CurrentValue;
  pm25: CurrentValue;
  so2: CurrentValue;
  t: CurrentValue;
  w: CurrentValue;
  wg: CurrentValue;
}

export interface CurrentValue {
  v: number;
}

export interface Time {
  s: Date;
  tz: string;
  v: number;
  iso: Date;
}
