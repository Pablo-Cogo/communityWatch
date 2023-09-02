import React, { useEffect, useState, useRef } from "react";
import {
  Close,
  CheckCircle,
  Cancel,
  WarningAmber,
  Info,
} from "@mui/icons-material";
import { ToastData, ToastProps, ToastStatus } from "./types";
import * as S from "./style";

const Toast = ({ toast, clearMessage, closeToast, className }: ToastProps) => {
  const defaulTime = 4000;
  const [localToast, setLocalToast] = useState<ToastData>(toast);
  const [time, setTime] = useState(defaulTime);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const timeBarRef = useRef<HTMLDivElement | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const clearProgressTimer = () => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
  };

  const getIcons = (state: ToastStatus) => {
    switch (state) {
      case ToastStatus.SUCCESS:
        return <CheckCircle />;
      case ToastStatus.ERROR:
        return <Cancel />;
      case ToastStatus.WARNING:
        return <WarningAmber />;
      case ToastStatus.INFO:
        return <Info />;
    }
  };

  const getTexts = (state: ToastStatus) => {
    switch (state) {
      case ToastStatus.SUCCESS:
        return <p>Sucesso</p>;
      case ToastStatus.ERROR:
        return <p>Erro</p>;
      case ToastStatus.WARNING:
        return <p>Atenção</p>;
      case ToastStatus.INFO:
        return <p>Informativo</p>;
    }
  };

  const closeMsg = () => {
    const toastElement = toastRef.current;
    clearProgressTimer();
    clearMessage();
    var intVal = setInterval(() => {
      if (toastElement) {
        const right = parseFloat(
          window.getComputedStyle(toastElement).right.replace(/[^0-9.]/g, "")
        );
        const width = parseFloat(
          window.getComputedStyle(toastElement).width.replace(/[^0-9.]/g, "")
        );
        if (right > width) {
          closeToast();
          clearInterval(intVal);
        }
      }
    });
  };

  const restartProgress = () => {
    setTime(defaulTime);
    clearProgressTimer();
    progressTimer.current = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);
  };

  const handleMouseEnter = () => {
    const timeBarElement = timeBarRef.current;
    if (timeBarElement) {
      timeBarElement.classList.remove("pulse");
    }
    clearProgressTimer();
  };

  const handleMouseLeave = () => {
    const timeBarElement = timeBarRef.current;
    if (timeBarElement) {
      timeBarElement.classList.add("pulse");
    }
    restartProgress();
  };

  useEffect(() => {
    const toastElement = toastRef.current;
    const timeBarElement = timeBarRef.current;

    if (toast.message) {
      if (toastElement && timeBarElement) {
        toastElement.style.display = "flex";
        timeBarElement.classList.add("pulse");
      }
      setLocalToast(toast);
      restartProgress();
    } else {
      if (timeBarElement) {
        timeBarElement.classList.remove("pulse");
      }
      clearProgressTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    if (time <= 0) {
      closeMsg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <S.ToastContainer
      className={`${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      message={toast.message}
      ref={toastRef}
    >
      <S.IconContainer state={localToast.status}>
        {getIcons(localToast.status)}
      </S.IconContainer>
      <S.TitleContainer state={localToast.status}>
        <S.CloseContainer onClick={closeMsg} state={localToast.status}>
          <Close />
        </S.CloseContainer>
        {getTexts(localToast.status)}
        <span>{localToast.message}</span>
      </S.TitleContainer>
      <S.TimeBar
        ms={defaulTime}
        className="pulse"
        state={localToast.status}
        ref={timeBarRef}
      />
    </S.ToastContainer>
  );
};

export default Toast;
