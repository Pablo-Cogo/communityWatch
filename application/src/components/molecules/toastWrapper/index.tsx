import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import Toast from "../../atoms/Toast";
import { ToastData, ToastStatus } from "../../atoms/Toast/types";

export interface ToastWrapperRef {
  addToast: (status: ToastStatus, message: string) => void;
  getToasts: () => ToastData[];
}

const ToastWrapper = forwardRef<ToastWrapperRef>((_, ref) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const canClose = toasts.every((toast) => !toast.isOpen);
    if (canClose && toasts.length > 0) {
      setToasts([]);
    }
  }, [toasts]);

  const addToast = (status: ToastStatus, message: string) => {
    const newToast = { status, message, isOpen: true };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const getToasts = () => {
    return toasts;
  };

  const closeToast = (index: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast, i) =>
        i === index ? { ...toast, isOpen: false } : toast
      )
    );
  };

  const removeToast = (index: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast, i) =>
        i === index ? { ...toast, message: null } : toast
      )
    );
  };

  useImperativeHandle(ref, () => ({
    addToast,
    getToasts,
  }));

  return (
    <div className="toast-wrapper absolute top-0 right-0">
      {toasts.map((toast, index) => (
        <Toast
          className="!relative"
          key={index}
          toast={toast}
          closeToast={() => closeToast(index)}
          clearMessage={() => removeToast(index)}
        />
      ))}
    </div>
  );
});

export default ToastWrapper;
