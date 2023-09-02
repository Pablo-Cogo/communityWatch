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
    axios.defaults.withCredentials = true;
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    return this.request<T>("get", url, undefined, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    return this.request<T>("post", url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    return this.request<T>("put", url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    return this.request<T>("delete", url, undefined, config);
  }

  private async request<T>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    try {
      const response: AxiosResponse<T> = await this.instance.request({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      this.handleRequestError(error); // Trate o erro aqui
      return undefined;
    }
  }

  private handleRequestError(error: any): void {
    const toastService = ServiceLocator.getToastService();
    if (error.response) {
      toastService.addSuccessToast(`Erro: ${error.response.data.error}`);
      toastService.addErrorToast(`Erro: ${error.response.data.error}`);
      toastService.addWarningToast(`Erro: ${error.response.data.error}`);
      toastService.addInfoToast(`Erro: ${error.response.data.error}`);
      console.error(`Request failed with status ${error.response.code}`);
    } else if (error.request) {
      toastService.addErrorToast("Erro: Sem resposta do servidor.");
      console.error("Request was made but no response received");
    } else {
      toastService.addErrorToast(`Erro: ${error.message}`);
      console.error(`Request setup error: ${error.message}`);
    }
  }
}
