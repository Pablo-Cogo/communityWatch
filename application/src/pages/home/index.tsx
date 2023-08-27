import { Button } from "../../components/atoms/Button";
import ExternalHeader from "../../components/organisms/header/external";
import { Container } from "../../components/organisms/header/external/style";

const Home = () => {
  return (
    <section className="h-full">
      <ExternalHeader />
      <main className="flex items-center w-full h-full bg-black pt-[100px] max-[780px]:pt-[20%]">
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
        </Container>
      </main>
    </section>
  );
};

export default Home;