export enum ToastStatus {
  SUCCESS = 0,
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
}

export interface ToastData {
  status: ToastStatus;
  message: string | null;
  isOpen?: boolean;
}

export interface ToastProps {
  toast: ToastData;
  clearMessage: () => void;
  closeToast: () => void;
  className?: string;
}
