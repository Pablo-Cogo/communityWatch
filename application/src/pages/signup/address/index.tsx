import SignUpContainer from "../../../components/organisms/signup";
import Back from "../../../components/atoms/Back";
import { Input } from "../../../components/atoms/Input";
import { Button } from "../../../components/atoms/Button";
import { DangerLink } from "../../../components/molecules/dangerLink";
import { useUserContext } from "../../../contexts/user.context";
import { useEffect, useState } from "react";
import { SignUpMailProps } from "../../../types/user";
import { useLocation, useNavigate } from "react-router-dom";
import { Select } from "../../../components/atoms/Select";
import { change } from "../../../helpers/change";
import { masks } from "../../../helpers/masks";
import ServiceLocator from "../../../services/service.locator";
import { Address } from "../../../types/address";
import UserService from "../../../services/user.service";
import AddressService from "../../../services/address.service";
import PersonService from "../../../services/person.service";

const AddressSignUp = () => {
  const { getMailSignUp } = useUserContext();
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState<SignUpMailProps | null>(null);
  const [values, setValues] = useState<Address | null>(null);
  const [valuesMaskered, setValuesMaskered] = useState<Address | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      getMailSignUp().then((response) => {
        if (response) {
          console.log(response);
          setUserSignUp({
            userCpf: response.userCpf,
            userDate: response.userDate,
            userName: response.userName,
            userEmail: response.userEmail,
            userImage: response.userImage,
            personPhone: response.personPhone,
          });
        } else {
          navigate("/signup/new");
        }
      });
    };
    fetchData();
  }, [getMailSignUp, navigate]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastService = ServiceLocator.getToastService();
    if (validateForm()) {
      console.log(userSignUp);
      if (userSignUp && values) {
        try {
          const address = await AddressService.registerAddress({
            addressCity: values.addressCity,
            addressDistrict: values.addressDistrict,
            addressNumber: values.addressNumber,
            addressState: values.addressState,
            addressStreet: values.addressStreet,
            addressZipCode: values.addressZipCode,
          });
          console.log(address);

          const user = await UserService.registerUser({
            userName: userSignUp.userName,
            userEmail: userSignUp.userEmail,
            userRole: 2,
            userPassword: null,
          });
          console.log({
            addressId: address.id ?? "",
            personPhone: userSignUp.personPhone,
            userId: user.id ?? "",
            personCPF: userSignUp.userCpf ?? "",
            personFullName: userSignUp.userName,
            personBirth: new Date(userSignUp.userDate ?? ""),
          });

          const person = await PersonService.registerPerson({
            addressId: address.id ?? "",
            personPhone: userSignUp.personPhone,
            userId: user.id ?? "",
            personCPF: userSignUp.userCpf ?? "",
            personFullName: userSignUp.userName,
            personBirth: new Date(userSignUp.userDate ?? ""),
          });

          if (address && user && person) {
            toastService.addSuccessToast("Usuario registrado com sucesso.");
            const from = location.state?.from || "/adm";
            navigate(from);
          } else {
            toastService.addErrorToast(
              "Ocorreu um erro ao cadastrar o usuário."
            );
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const validateForm = () => {
    const toastService = ServiceLocator.getToastService();
    if (!values?.addressState) {
      toastService.addErrorToast("Campo: Estado obrigatório.");
      return false;
    } else if (!values?.addressCity) {
      toastService.addErrorToast("Campo: Cidade obrigatório.");
      return false;
    } else if (!values?.addressZipCode) {
      toastService.addErrorToast("Campo: CEP obrigatório.");
      return false;
    } else if (!values?.addressDistrict) {
      toastService.addErrorToast("Campo: Bairro obrigatório.");
      return false;
    } else if (!values?.addressStreet) {
      toastService.addErrorToast("Campo: Rua obrigatório.");
      return false;
    } else if (!values?.addressNumber) {
      toastService.addErrorToast("Campo: Numero obrigatório.");
      return false;
    }
    return true;
  };

  const states = [{ value: "SC", label: "Santa catarina" }];
  const cities = [{ value: "Chapecó", label: "Chapecó" }];

  return (
    <SignUpContainer>
      <form onSubmit={(e) => submitForm(e)}>
        <Back href="/signup/new" />
        <h2 className="mb-[5px] font-bold text-2xl">Cadastrar-se</h2>
        <h3 className="mb-[5px] font-semibold">
          Dados complementares... ultima etapa.
        </h3>
        <h3 className="mb-[20px]">OBS: não atendemos todos os estados.</h3>
        <Select
          id="addressState"
          label="Estado"
          className="mt-4"
          val={values?.addressState ?? ""}
          required={true}
          options={states}
          onChange={(e) => change.noMask(e, setValues)}
        />
        <Select
          id="addressCity"
          label="Cidade"
          className="mt-4"
          val={values?.addressCity ?? ""}
          required={true}
          options={cities}
          onChange={(e) => change.noMask(e, setValues)}
        />
        <Input
          id={"addressZipCode"}
          label="Cep"
          type="text"
          className="mt-4"
          val={valuesMaskered?.addressZipCode ?? ""}
          value={valuesMaskered?.addressZipCode ?? ""}
          onChange={(e) =>
            change.valuesMaskered(
              e,
              setValuesMaskered,
              setValues,
              masks.cepMask,
              masks.resetMask
            )
          }
        />
        <Input
          id={"addressDistrict"}
          label="Bairro"
          type="text"
          className="mt-4"
          required={true}
          val={values?.addressDistrict ?? ""}
          value={values?.addressDistrict ?? ""}
          onChange={(e) => change.noMask(e, setValues)}
        />
        <Input
          id={"addressStreet"}
          label="Rua"
          type="text"
          className="mt-4"
          required={true}
          val={values?.addressStreet ?? ""}
          value={values?.addressStreet ?? ""}
          onChange={(e) => change.noMask(e, setValues)}
        />
        <Input
          id={"addressNumber"}
          label="Numero + complemento"
          type="text"
          className="mt-4"
          required={true}
          val={values?.addressNumber ?? ""}
          value={values?.addressNumber ?? ""}
          onChange={(e) => change.noMask(e, setValues)}
        />
        <Button type="submit" className="mt-[20px] w-full" typing="primary">
          Cadastrar-se
        </Button>
        <span className="w-full flex justify-center mt-4 md:mt-6">
          Já tem uma conta?
          <DangerLink className="ml-0.5 font-medium uppercase" href="/login">
            Faça login
          </DangerLink>
        </span>
      </form>
    </SignUpContainer>
  );
};

export default AddressSignUp;
