import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import ServiceLocator from "../services/service.locator";

export default class Http {
  private instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const token = localStorage.getItem("user");
    if (token) this.instance.defaults.headers["x-access-token"] = token;
  }

  addHeader(key: string, value: string) {
    this.instance.defaults.headers[key] = value;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("get", url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("post", url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>("put", url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>("delete", url, undefined, config);
  }

  private async request<T>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.request({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  private handleRequestError(error: any): Error {
    const toastService = ServiceLocator.getToastService();
    if (error.response) {
      toastService.addSuccessToast(`Erro: ${error.response.data.error}`);
      toastService.addErrorToast(`Erro: ${error.response.data.error}`);
      toastService.addWarningToast(`Erro: ${error.response.data.error}`);
      toastService.addInfoToast(`Erro: ${error.response.data.error}`);
      return new Error(`Erro: ${error.response.data.error}`);
    } else if (error.request) {
      toastService.addErrorToast("Erro: Sem resposta do servidor.");
      return new Error("Erro: Sem resposta do servidor.");
    } else {
      toastService.addErrorToast(`Erro: ${error.message}`);
      return new Error(`Erro: ${error.message}`);
    }
  }
}
