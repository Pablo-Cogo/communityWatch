import { Input } from "../../components/atoms/Input";
import { change } from "../../helpers/change";
import { Button } from "../../components/atoms/Button";
import { GoogleButton } from "../../components/molecules/googleButton";
import Logo from "../../assets/logo";
import { DangerLink } from "../../components/molecules/dangerLink";
import { useAuth } from "../../contexts/auth.context";

export default function Login() {
  const { user, setUser, login, getUrlGoogleLogin } = useAuth();
  return (
    <section className="flex min-h-full overflow-hidden">
      <article className="flex w-full justify-center sm:my-12">
        <div className="flex flex-col grow w-full sm:max-w-[350px]">
          <form
            onSubmit={(e) => login(e)}
            className="px-14 py-10 sm:border sm:border-solid sm:border-[rgb(219,219,219)] sm:mb-2.5 sm:py-2.5 sm:px-10 sm:rounded-sm sm:flex sm:flex-col sm:items-center sm:px-6"
          >
            <h1 className="text-center text-3xl font-medium tracking-tight text-gray-900 md:my-6">
              <Logo className="max-w-[175px] md:scale-[1.4] w-full m-auto" />
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
            <DangerLink
              className="w-full flex justify-end mt-2 mb-2 font-normal text-blue"
              href="/#"
            >
              Esqueceu a senha?
            </DangerLink>
            <Button type="submit" className="mt-3 w-full" typing="primary">
              Entrar
            </Button>
            <span className="w-full flex justify-center mt-4 md:mt-6">
              Não tem uma conta?
              <DangerLink className="ml-0.5 font-medium uppercase" href="/#">
                cadastre-se
              </DangerLink>
            </span>
            <div className="mx-auto my-4 mb:my-6 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
              ou
            </div>
            <GoogleButton
              onClick={() => getUrlGoogleLogin()}
              type="button"
              className="sm:mb-5 md:mb-7"
            />
          </form>
        </div>
      </article>
    </section>
  );
}
