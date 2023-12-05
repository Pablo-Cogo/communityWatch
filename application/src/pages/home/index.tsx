import { useLoadScript } from "@react-google-maps/api";
import { Button } from "../../components/atoms/Button";
import ExternalHeader from "../../components/organisms/header/external";
import { Container } from "../../components/organisms/header/external/style";
import Map from "../../components/organisms/map";
import image from "../../assets/walpaper/walpaper-home.jpg";

const Home = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB6G-WhrxCon1Blj9gMxjkTX19AhEnkkU8",
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <section className="h-full">
      <ExternalHeader />
      <main className="flex items-center w-full h-full bg-black pt-[100px] max-[780px]:pt-[20%]">
        <img
          src={image}
          alt=""
          className="h-full object-cover absolute w-full top-0 left-[30%] filter contrast-50 rounded-[10px]"
        />
        <Container className="w-full flex justify-between items-start py-[20px] relative">
          {/* <span
            style={{ fontSize: "70px" }}
            className="w-[50%] h-full flex flex-col justify-center text-white"
          >
            Precisa de apoio?
            <Button className="w-[200px]">Entre em contato</Button>
          </span>
          <span className="w-[50%] h-[100%] rounded-[10px] bg-white flex items-center justify-center">
            alguma imagem...
          </span> */}

          {/* <Map /> */}
        </Container>
      </main>
    </section>
  );
};

export default Home;
