import { extendType, nonNull, objectType, stringArg } from "nexus";
import { getPollution } from "../../../services/external/WaqiApi"


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
