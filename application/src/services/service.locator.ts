import AutoFocusService from "./autofocus.service";
import ToastService from "./toast.service";

class ServiceLocator {
  private static toastService: ToastService | null = null;
  private static autoFocusService: AutoFocusService | null = null;

  static setToastService(toastService: ToastService) {
    ServiceLocator.toastService = toastService;
  }

  static getToastService() {
    if (!ServiceLocator.toastService) {
      throw new Error("ToastService is not set in ServiceLocator");
    }
    return ServiceLocator.toastService;
  }

  static setAutoFocusService(autoFocusService: AutoFocusService) {
    ServiceLocator.autoFocusService = autoFocusService;
  }

  static getAutoFocusService() {
    if (!ServiceLocator.autoFocusService) {
      throw new Error("ToastService is not set in ServiceLocator");
    }
    return ServiceLocator.autoFocusService;
  }
}

export default ServiceLocator;
