import Http from "../http";
import {
  LoginProps,
  AuthProps,
  UserProps,
  ResponseAuthProps,
  SignUpMailProps,
  User,
} from "../types/user";
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

  static async encodeMailSignUp(user: SignUpMailProps): Promise<void> {
    const token = await this.encodeJsonToken<SignUpMailProps>(user);
    if (token) sessionStorage.setItem("mailSignUp", token);
  }

  static async decodeMailSignUp(): Promise<SignUpMailProps | null> {
    const token = sessionStorage.getItem("mailSignUp");
    return await this.decodeJsonToken<SignUpMailProps>(token);
  }

  static async registerUser(user: User): Promise<User> {
    const response = await this.http.post<User>("/user", user);
    console.log(response);
    return response;
    // userName: string;
    // userEmail: string;
    // userPassword: string;
    // userRole: userRole;
    // userImage?: string;
  }

  static async getUrlGoogleLogin(redirect: string): Promise<string> {
    const { url } = await this.http.get<{ url: string }>(
      `/user/auth/google/url?redirect=${redirect}`
    );
    return url;
  }

  static async googleLogin(code: string): Promise<ResponseAuthProps | null> {
    const toastService = ServiceLocator.getToastService();
    const locationBefore = sessionStorage.getItem("location");
    const response = await this.http
      .post<AuthProps>("/user/auth/google", {
        code,
      })
      .then((response) => {
        const { userName, userEmail, userImage, token, isLogged } = response;
        if (isLogged) {
          localStorage.setItem("user", token);
          toastService.addSuccessToast("Seja bem vindo!!");
        } else {
          sessionStorage.setItem("google-user", token);
          if (locationBefore === "/login")
            toastService.addInfoToast("Usuário ainda não cadastrado.");
          sessionStorage.removeItem("location");
        }
        return { userName, userEmail, userImage, isLogged };
      })
      .catch(() => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("google-user");
        sessionStorage.removeItem("location");
        return null;
      });
    return response;
  }

  static async encodeJsonToken<T>(json: T): Promise<string | null> {
    const response = await this.http.post<string | null>(
      "/user/auth/google/encode",
      json
    );
    return response;
  }

  static async decodeJsonToken<T>(token: string | null): Promise<T | null> {
    if (token) {
      const response = await this.http.post<T>("/user/auth/google/decode", {
        token,
      });
      return response;
    }
    return null;
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
