import { useState } from "react";
import { Input } from "../../components/atoms/Input";
import { change } from "../../helpers/change";
import { UserLogin } from "./types";
import { Button } from "../../components/atoms/Button";
import { GoogleButton } from "../../components/molecules/googleButton";
import { StyledLink } from "../../components/atoms/Link";
import Logo from "../../assets/logo";

export default function Login() {
  const [user, setUser] = useState<UserLogin | null>(null);
  return (
    <section className="flex min-h-full overflow-hidden">
      <article className="flex w-full justify-center sm:my-12">
        <div className="flex flex-col grow w-full sm:max-w-[350px]">
          <form className="px-14 py-10 sm:border sm:border-solid sm:border-[rgb(219,219,219)] sm:mb-2.5 sm:py-2.5 sm:px-10 sm:rounded-sm sm:flex sm:flex-col sm:items-center sm:px-6">
            <h1 className="text-center text-3xl font-medium tracking-tight text-gray-900 my-8">
              <Logo className="max-w-[175px] scale-[2] w-full m-auto" />
            </h1>
            <Input
              id={"userEmail"}
              label="Email: "
              type="email"
              className="mt-3"
              val={user?.userEmail ?? ""}
              value={user?.userEmail ?? ""}
              onChange={(e) => change.noMask(e, setUser)}
            />
            <Input
              type="password"
              id="userPassword"
              label="Senha: "
              className="mt-3"
              val={user?.userPassword ?? ""}
              onChange={(e) => change.noMask(e, setUser)}
            />
            <StyledLink
              className="w-full flex justify-end mt-2 mb-2 font-normal text-blue"
              href="/#"
            >
              Esqueceu a senha?
            </StyledLink>
            <Button type="submit" className="mt-3 w-full" typing="primary">
              Entrar
            </Button>
            <span className="w-full flex justify-center mt-6">
              Não tem uma conta?
              <StyledLink className="ml-0.5 font-medium uppercase" href="/#">
                cadastre-se
              </StyledLink>
            </span>
            <div className="mx-auto my-6 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
              ou
            </div>
            <GoogleButton className="mb-7" />
          </form>
        </div>
      </article>
    </section>
  );
}
