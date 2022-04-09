import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { PollutionStatus } from "../services/external/WaqiApi";
import { PollutionQuery } from "../services/graphql/queries";

function getColorForAirQuality(quality: PollutionStatus) {
  switch (quality) {
    case PollutionStatus.Good:
      return "green";
    case PollutionStatus.Fair:
      return "lime";
    case PollutionStatus.Poor:
      return "yellow";
    case PollutionStatus.VeryPoor:
      return "orange";
    case PollutionStatus.ExtremelyPoor:
      return "red";
  }
}

function getNameForAirQuality(quality: PollutionStatus) {
  switch (quality) {
    case PollutionStatus.Good:
      return "DOBRA";
    case PollutionStatus.Fair:
      return "DOSTATECZNA";
    case PollutionStatus.Poor:
      return "UMIARKOWANA";
    case PollutionStatus.VeryPoor:
      return "ZŁA";
    case PollutionStatus.ExtremelyPoor:
      return "BARDZO ZŁA";
  }
}

const AirPollutionItem = ( {item, quality, value, unit } ) => {
  let colorName = getColorForAirQuality(quality);
  console.log(quality);

  return (
    <div className={`flex flex-row rounded-lg justify-between text-sm py-1 px-2 bg-${colorName}-200`}>
      <h2 className={`text-${colorName}-700 font-light`}>{item}</h2>
      <h4 className={`font-medium ml-1 text-${colorName}-700`}>{value}</h4>
      <span className={`font-light text-${colorName}-700`}>{unit}</span>
    </div>
  );
}

const AirPollutionCard = () => {
  const [fetchAirData, airData] = useLazyQuery(PollutionQuery);

  useEffect(() => {
    // @ts-ignore
    fetchAirData();
  }, [fetchAirData]);

  if (airData.loading || !airData.called) {
    return <></>;
  }

  console.log(airData.data);
  let airQualityName = getNameForAirQuality(airData.data.pollutionStatus.average);
  let colorName = getColorForAirQuality(airData.data.pollutionStatus.average);
  let polStatus = airData.data.pollutionStatus;
  let polValues = airData.data.pollution;
  //let backgroundColor = getColorForAirQuality(PollutionStatus.ExtremelyPoor);

  return (
    <>
      <div className={`bg-${colorName}-100 rounded-lg p-4`}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-between">
            <h2 className={`text-${colorName}-800`}>Jakość powietrza</h2>
            <h1 className={`text-3xl font-semibold text-${colorName}-800`}>{airQualityName}</h1>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="flex flex-col justify-around space-y-2">
              <AirPollutionItem item="CO2" quality={polStatus.carbonMonoxide} value={polValues.carbonMonoxide}/>
              <AirPollutionItem item="PM10" quality={polStatus.particulateMatter10} value={polValues.particulateMatter10}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AirPollutionCard;