import { extendType, nonNull, objectType, stringArg } from "nexus";
import { getPollution } from "../../../services/external/WaqiApi"


export const Pollution = objectType({
	name: "Pollution",
	definition(t) {
		t.float("co"); // carbon monoxide
		t.float("h"); // humidity
		t.float("no2"); // nitrogen dioxide
		t.float("o3"); // ozone
		t.float("p"); // particulate matter
		t.float("pm10"); // particulate matter
		t.float("pm25"); // particulate matter
		t.float("so2"); // sulfur dioxide
		t.float("t"); // temperature
		t.float("w"); // wind
		t.float("wg"); // wind gust
	}
})

export const PollutionQueries = extendType({
	type: "Query",
	definition: (t) => {
		t.field("pollution", {
			type: "Pollution",
			resolve: () => getPollution()
		})
	}

})
