interface TravelModeIconProps {
  travel_mode: string;
}

export default function TravelModeIcon(props: TravelModeIconProps) {
  let iconName = "local_airport";
  return (
    <>
      <span className="h-14 w-14 rounded-full material-icons-outlined">
        {iconName}
      </span>
    </>
  );
}
