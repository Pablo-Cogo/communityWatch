import ToastService from "./toast.service";

class ServiceLocator {
  private static toastService: ToastService | null = null;

  static setToastService(toastService: ToastService) {
    ServiceLocator.toastService = toastService;
  }

  static getToastService() {
    if (!ServiceLocator.toastService) {
      throw new Error("ToastService is not set in ServiceLocator");
    }
    return ServiceLocator.toastService;
  }
}

export default ServiceLocator;
