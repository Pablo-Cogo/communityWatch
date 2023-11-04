export type PopupProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  title: string;
  isOpen: boolean;
  close: () => void;
  titleButtonCancel?: string;
  titleButtonConfirm?: string;
};
