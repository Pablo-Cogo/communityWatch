import ExternalHeader from "../../components/organisms/header/external";
import { Container } from "../../components/organisms/header/external/style";
import image from "../../assets/walpaper/walpaper-home.jpg";
import { ContainerHome, MainHome } from "./style";

const Home = () => {
  return (
    <ContainerHome>
      <ExternalHeader />
      <MainHome className="flex items-center w-full h-full">
        <Container className="w-full relative">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-x-10 h-full">
            <div className="w-full sm:w-[50%]">
              <h1 className="text-white text-6xl text-center sm:text-start mb-[12px]">
                Juntos somos mais <span className="text-[orange]">Fortes</span>
              </h1>
              <h2 className="text-[#9094a6] text-base text-justify">
                Unindo Corações e Mãos para Construir uma Rede de Proteção que
                Envolva Comunidades, Resista às Adversidades e Desperte a Força
                da Resiliência. Junte-se a Nós Nesta Jornada de Compromisso e
                Esperança.
              </h2>
            </div>
            <div className="w-full sm:w-[50%] absolute bottom-0 right-0">
              <img
                className="w-full sm:scale-[1.8] origin-bottom"
                src={image}
                alt=""
              />
            </div>
          </div>
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
      </MainHome>
    </ContainerHome>
  );
};

export default Home;
