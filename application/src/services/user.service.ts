import Http from "../http";
import { LoginProps, TokenProps } from "../types/user";
import ServiceLocator from "./service.locator";

export default class UserService {
  private static http = new Http("http://localhost:5000");
  static async login({ userEmail, userPassword }: LoginProps) {
    const toastService = ServiceLocator.getToastService();

    await this.http
      .post<TokenProps>("/user/authenticate", {
        userEmail,
        userPassword,
      })
      .then((response) => {
        localStorage.setItem("user", response?.token);
        toastService.addSuccessToast("Seja bem vindo!!");
      })
      .catch(() => {
        localStorage.removeItem("user");
      });
  }
  static async isLogged(): Promise<boolean> {
    const token = localStorage.getItem("user");
    if (token) {
      this.http.addHeader("x-access-token", token);
    } else {
      this.http.addHeader("x-access-token", "");
    }

    const isValid = await this.http.get<boolean>("/user/validate");
    return isValid;
  }
}
