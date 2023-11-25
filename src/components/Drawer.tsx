import { FC, ReactNode, useEffect, useRef } from "react";

import { Mods, cn, createPortalRoot } from "../helpers";
import {
  useAppendPortalRoot,
  useMountTransition,
  usePreventScroll,
} from "../hooks";
import { Portal } from "./Portal";

import styles from "./Drawer.module.css";

type DrawerProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  removeWhenClosed?: boolean;
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
};

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  children,
  onClose,
  position = "top",
  removeWhenClosed = true,
  className,
}) => {
  const element = "drawer";

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

  return (
    <Portal element={portalRootRef.current}>
      <div
        aria-hidden={isOpen ? "false" : "true"}
        className={cn(styles.drawer_container, mods, [className])}
      >
        <div
          className={cn(styles.drawer, {}, [styles[position]])}
          role="dialog"
        >
          {children}
        </div>
        <div className={styles.backdrop} onClick={onClose} />
      </div>
      , portalRootRef.current, );
    </Portal>
  );
};
