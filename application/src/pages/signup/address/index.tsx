import SignUpContainer from "../shared";
import Back from "../../../components/atoms/Back";
import { Input } from "../../../components/atoms/Input";
import { Button } from "../../../components/atoms/Button";
import { DangerLink } from "../../../components/molecules/dangerLink";

const AddressSignUp = () => {
  return (
    //     addressState: ServedStates;
    //   addressCity: ServedCities;
    //   addressDistrict: string;
    //   addressStreet: string;
    //   addressNumber: string;
    //   addressZipCode: string;
    <SignUpContainer>
      <Back href="/signup/new" />
      <h2 className="mb-[5px] font-bold text-2xl">Cadastrar-se</h2>
      <h3 className="mb-[20px] font-semibold">
        Dados complementares... ultima etapa.
      </h3>
      <Input
        id={"userEmail"}
        label="Estado"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Cidade"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Cep"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Bairro"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Rua"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Numero"
        type="email"
        className="mt-3"
        val={""}
      />
      <Input
        id={"userEmail"}
        label="Complemento"
        type="email"
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

export default AddressSignUp;
