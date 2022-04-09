import { getWaqi } from "./WaqiRawApi"




export interface Pollution {
	carbonMonoxide: number
	humidity: number
	nitrogenDioxide: number
	ozone: number
	particulateMatter: number
	particulateMatter10: number
	particulateMatter25: number
	sulfurDioxide: number
	temperature: number
	wind: number
	windGust: number
}

export const getPollution = async (): Promise<Pollution> => {
	const raw = await getWaqi()

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
		windGust: raw.data.iaqi.wg.v
	}

}
