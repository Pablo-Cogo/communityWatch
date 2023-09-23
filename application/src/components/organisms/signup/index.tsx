import Logo4 from "../../../assets/logo/logov4";
import {
  AuthContent,
  AuthSidebar,
  Content,
  Main,
  MainContainer,
} from "./style";
import image from "../../../assets/walpaper/walpaper.jpg";

const SignUpContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainContainer>
      <AuthSidebar>
        <Logo4 className="absolute z-10 px-4 py-1 rounded-full w-[50%] mt-3" />
        <img src={image} alt="" className="h-full object-cover" />
      </AuthSidebar>
      <Content>
        <Main>
          <AuthContent>{children}</AuthContent>
        </Main>
      </Content>
    </MainContainer>
  );
};

export default SignUpContainer;
