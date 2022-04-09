import { getWaqi } from "./WaqiRawApi"


export interface Pollution {
	co: number // carbon monoxide
	h: number // humidity
	no2: number // nitrogen dioxide
	o3: number // ozone
	p: number // particulate matter
	pm10: number // particulate matter
	pm25: number // particulate matter
	so2: number // sulfur dioxide
	t: number // temperature
	w: number // wind
	wg: number // wind gust
}

export const getPollution = async (): Promise<Pollution> => {
	const raw = await getWaqi()

	return {
		co: raw.data.iaqi.co.v,
		h: raw.data.iaqi.h.v,
		no2: raw.data.iaqi.no2.v,
		o3: raw.data.iaqi.o3.v,
		p: raw.data.iaqi.p.v,
		pm10: raw.data.iaqi.pm10.v,
		pm25: raw.data.iaqi.pm25.v,
		so2: raw.data.iaqi.so2.v,
		t: raw.data.iaqi.t.v,
		w: raw.data.iaqi.w.v,
		wg: raw.data.iaqi.wg.v
	}
}
