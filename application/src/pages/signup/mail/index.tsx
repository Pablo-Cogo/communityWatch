import { useEffect, useState } from "react";
import Back from "../../../components/atoms/Back";
import { Button } from "../../../components/atoms/Button";
import { Input } from "../../../components/atoms/Input";
import { DangerLink } from "../../../components/molecules/dangerLink";
import SignUpContainer from "../../../components/organisms/signup";
import { useGoogleContext } from "../../../contexts/google.context";
import { SignUpMailProps } from "../../../types/user";
import { change } from "../../../helpers/change";
import { useUserContext } from "../../../contexts/user.context";
import { masks } from "../../../helpers/masks";
import ServiceLocator from "../../../services/service.locator";

const MailSignUp = () => {
  const { getUserGoogle } = useGoogleContext();
  const { encodeMailSignUp } = useUserContext();
  const [userSignUp, setUserSignUp] = useState<SignUpMailProps | null>(null);
  const [hasGoogle, setHasGoogle] = useState<boolean | null>(null);
  const [userSignUpMarkered, setUserSignUpMaskered] =
    useState<SignUpMailProps | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      getUserGoogle().then((response) => {
        if (response) {
          setUserSignUp({
            userName: response.userName,
            userEmail: response.userEmail,
            userImage: response.userImage ?? "",
          });
          setHasGoogle(true);
        } else {
          setHasGoogle(false);
        }
      });
    };
    fetchData();
  }, [getUserGoogle]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      if (userSignUp)
        encodeMailSignUp({
          userName: userSignUp.userName,
          userEmail: userSignUp.userEmail,
          userPassword: userSignUp.userPassword,
          userImage: userSignUp.userEmail,
          personPhone: userSignUp.personPhone,
          userCpf: userSignUp.userCpf,
          userDate: userSignUp.userDate,
        });
    }
  };

  const validateForm = () => {
    const toastService = ServiceLocator.getToastService();
    if (!userSignUp?.userName) {
      toastService.addErrorToast("Campo: Nome completo obrigatório.");
      return false;
    } else if (!userSignUp?.userCpf) {
      toastService.addErrorToast("Campo: CPF obrigatório.");
      return false;
    } else if (!userSignUp?.userDate) {
      toastService.addErrorToast("Campo: Data de nascimento obrigatório.");
      return false;
    } else if (!userSignUp?.userEmail) {
      toastService.addErrorToast("Campo: Email obrigatório.");
      return false;
    }
    if (hasGoogle === false) {
      if (!userSignUp?.userPassword) {
        toastService.addErrorToast("Campo: Senha obrigatório.");
        return false;
      } else if (!userSignUp?.userConfirmPassword) {
        toastService.addErrorToast("Campo: Confirmar senha obrigatório.");
        return false;
      } else if (userSignUp?.userPassword !== userSignUp?.userConfirmPassword) {
        toastService.addErrorToast(
          "Campos de senha e confirmar senha não conferem."
        );
        return false;
      }
    }
    return true;
  };

  return (
    <SignUpContainer>
      <form onSubmit={(e) => submitForm(e)}>
        <Back href="/signup" />
        <h2 className="mb-[20px] font-bold text-2xl">Cadastrar-se</h2>
        <Input
          id={"userName"}
          label="Nome completo"
          type="text"
          className="mt-4"
          required={true}
          val={userSignUp?.userName ?? ""}
          value={userSignUp?.userName ?? ""}
          onChange={(e) => change.noMask(e, setUserSignUp)}
        />
        <Input
          id={"userCpf"}
          label="CPF"
          type="tel"
          className="mt-4"
          required={true}
          val={userSignUpMarkered?.userCpf ?? ""}
          value={userSignUpMarkered?.userCpf ?? ""}
          onChange={(e) =>
            change.valuesMaskered(
              e,
              setUserSignUpMaskered,
              setUserSignUp,
              masks.cpfMask,
              masks.resetMask
            )
          }
        />
        <Input
          id={"userDate"}
          label="Data de nascimento"
          type="text"
          className="mt-4"
          required={true}
          val={userSignUp?.userDate ?? ""}
          value={userSignUp?.userDate ?? ""}
          onChange={(e) => change.valuesMask(e, setUserSignUp, masks.dataMask)}
        />
        <Input
          id={"userEmail"}
          label="Email"
          type="email"
          className="mt-4"
          val={userSignUp?.userEmail ?? ""}
          value={userSignUp?.userEmail ?? ""}
          onChange={(e) => change.noMask(e, setUserSignUp)}
        />
        {hasGoogle === false ? (
          <>
            <Input
              type="password"
              id="userPassword"
              label="Senha"
              className="mt-4"
              required={true}
              val={userSignUp?.userPassword ?? ""}
              onChange={(e) => change.noMask(e, setUserSignUp)}
            />
            <Input
              type="password"
              id="userConfirmPassword"
              label="Confirmar senha"
              className="mt-4"
              required={true}
              val={userSignUp?.userConfirmPassword ?? ""}
              onChange={(e) => change.noMask(e, setUserSignUp)}
            />
          </>
        ) : null}
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

export default MailSignUp;
