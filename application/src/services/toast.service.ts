import { ToastStatus } from "../components/atoms/Toast/types";
import { ToastWrapperRef } from "../components/molecules/toastWrapper";

class ToastService {
  private toastWrapperRef: React.RefObject<ToastWrapperRef>;

  constructor(toastWrapperRef: React.RefObject<ToastWrapperRef>) {
    this.toastWrapperRef = toastWrapperRef;
  }

  addSuccessToast(message: string) {
    if (this.toastWrapperRef.current) {
      this.toastWrapperRef.current.addToast(ToastStatus.SUCCESS, message);
    }
  }

  addErrorToast(message: string) {
    if (this.toastWrapperRef.current) {
      this.toastWrapperRef.current.addToast(ToastStatus.ERROR, message);
    }
  }

  addWarningToast(message: string) {
    if (this.toastWrapperRef.current) {
      this.toastWrapperRef.current.addToast(ToastStatus.WARNING, message);
    }
  }

  addInfoToast(message: string) {
    if (this.toastWrapperRef.current) {
      this.toastWrapperRef.current.addToast(ToastStatus.INFO, message);
    }
  }
}

export default ToastService;
