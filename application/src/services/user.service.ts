import Http from "../http";
import { LoginProps } from "../types/user";
import ServiceLocator from "./service.locator";

export default class UserService {
  private static http = new Http("http://localhost:5000");
  public static async login({ userEmail, userPassword }: LoginProps) {
    const toastService = ServiceLocator.getToastService();
    const retorno = await this.http.post<LoginProps>("/user/authenticate", {
      userEmail,
      userPassword,
    });
    if (retorno) toastService.addSuccessToast("Seja bem vindo!!");
    console.log(retorno);
  }
}
