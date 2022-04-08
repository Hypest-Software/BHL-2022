import { TransitInfo } from "../services/models/TransitInfo";

interface DestinationCardProps {
  transit_info: TransitInfo;
  destination_name: string;
  destination_id: number;
}

function genRandomDelayValue(duration: number) {
  const min = Math.floor(duration * 0.15);
  const max = duration * 0.5;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const DestinationCard = (props: DestinationCardProps) => {
  // let duration = props.transit_info.duration;
  let duration = 15;
  let delay = genRandomDelayValue(duration);
  let durationColor = delay > 0.3 * duration ? "text-red-700" : "text-green-700";

  return (
  <>
    <div className="bg-gray-100 rounded-lg flex justify-between items-center p-4">
      <div className="flex flex-grow align-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{props.destination_name}</h1>
          <h4 className="text-gray-600"></h4>
        </div>
        <div className="flex flex-col">
          <span className={durationColor + " font-medium"}>
            {duration + delay} min
          </span>
        </div>
      </div>
    </div>
  </>
  );
}

