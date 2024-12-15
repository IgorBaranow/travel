import { useState } from "react";

export default function useDialog(defaultState?: boolean) {
  const [isOpen, setOpen] = useState(defaultState ?? false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen((open) => !open);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}
