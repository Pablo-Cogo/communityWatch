import Back from "../../../components/atoms/Back";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { DangerLink } from "../../../components/molecules/dangerLink";
import SignUpContainer from "../shared";

const MailSignUp = () => {
  return (
    <SignUpContainer>
      <Back href="/signup" />
      <h2 className="mb-[20px] font-bold text-2xl">Cadastrar-se</h2>
      <Input
        id={"userEmail"}
        label="Nome completo"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="CPF"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Data de nascimento"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Email"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        type="password"
        id="userPassword"
        label="Senha"
        className="mt-3"
        val={""}
      />
      <Input
        type="password"
        id="userPassword"
        label="Confirmar senha"
        className="mt-3"
        val={""}
      />
      <Button
        href="/signup/address"
        type="submit"
        className="mt-[20px] w-full"
        typing="primary"
      >
        Cadastrar-se
      </Button>
      <span className="w-full flex justify-center mt-4 md:mt-6">
        Já tem uma conta?
        <DangerLink className="ml-0.5 font-medium uppercase" href="/login">
          Faça login
        </DangerLink>
      </span>
    </SignUpContainer>
  );
};

export default MailSignUp;
