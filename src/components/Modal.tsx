import { FC, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Mods, cn, createPortalRoot } from "../helpers";

import {
  useAppendPortalRoot,
  useMountTransition,
  usePreventScroll,
} from "../hooks";

import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  removeWhenClosed?: boolean;
  className?: string;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  removeWhenClosed = true,
  className,
}) => {
  const element = "modal";

  const bodyRef = useRef<HTMLBodyElement>(document.querySelector("body"));

  const portalRootRef = useRef<HTMLElement>(
    document.getElementById(element) || createPortalRoot(element),
  );

  const isTransitioning = useMountTransition(isOpen, 300);

  useAppendPortalRoot(bodyRef, portalRootRef);
  usePreventScroll(bodyRef, isOpen);

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }

    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);

  if (!isTransitioning && removeWhenClosed && !isOpen) {
    return null;
  }

  const mods: Mods = {
    [styles.open]: isOpen,
    [styles.in]: isTransitioning,
  };

  return createPortal(
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={styles.modal_container}
    >
      <div className={cn(styles.modal, mods, [className])} role="dialog">
        {children}
      </div>
      <div className={styles.backdrop} onClick={onClose} />
    </div>,
    portalRootRef.current,
  );
};
