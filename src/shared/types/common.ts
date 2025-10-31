export interface User {
  displayName: string;
  uid: string;
}

export interface DialogProps {
  onClose(): void;
  open: boolean;
}
