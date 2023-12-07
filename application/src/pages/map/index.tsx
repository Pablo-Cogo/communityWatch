import { useLoadScript } from "@react-google-maps/api";
import ExternalHeader from "../../components/organisms/header/external";
import Map from "../../components/organisms/map";
import Loading from "../../components/organisms/loading";

const MapView = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB6G-WhrxCon1Blj9gMxjkTX19AhEnkkU8",
    libraries: ["places"],
  });
  if (!isLoaded) return <Loading />;
  return (
    <div className="h-full bg-black">
      <ExternalHeader className="bg-black" />
      <Map />
    </div>
  );
};

export default MapView;
