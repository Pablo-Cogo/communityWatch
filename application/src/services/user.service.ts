import Http from "../http";
import { LoginProps, AuthProps, UserProps } from "../types/user";
import ServiceLocator from "./service.locator";

export default class UserService {
  private static http = new Http("http://localhost:5000");
  static async login({
    userEmail,
    userPassword,
  }: LoginProps): Promise<UserProps | null> {
    const toastService = ServiceLocator.getToastService();

    const response = await this.http
      .post<AuthProps>("/user/authenticate", {
        userEmail,
        userPassword,
      })
      .then((response) => {
        const { userName, userEmail, userImage, token } = response;
        localStorage.setItem("user", token);
        toastService.addSuccessToast("Seja bem vindo!!");
        return { userName, userEmail, userImage };
      })
      .catch(() => {
        localStorage.removeItem("user");
        return null;
      });
    return response;
  }

  static async getUrlGoogleLogin(redirect: string): Promise<string> {
    const { url } = await this.http.get<{ url: string }>(
      `/user/auth/google/url?redirect=${redirect}`
    );
    return url;
  }

  static async googleLogin(code: string) {
    const toastService = ServiceLocator.getToastService();
    const response = await this.http
      .post<AuthProps>("/user/auth/google", {
        code,
      })
      .then((response) => {
        const { userName, userEmail, userImage, token } = response;
        localStorage.setItem("user", token);
        toastService.addSuccessToast("Seja bem vindo!!");
        return { userName, userEmail, userImage };
      })
      .catch(() => {
        localStorage.removeItem("user");
        return null;
      });
    return response;
  }

  static async isLogged(): Promise<UserProps | boolean> {
    const token = localStorage.getItem("user");
    if (token) {
      this.http.addHeader("x-access-token", token);
    } else {
      this.http.addHeader("x-access-token", "");
    }
    const hasUser = await this.http.get<UserProps | boolean>("/user/validate");
    return hasUser;
  }
}
