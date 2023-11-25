import { RefObject, useEffect, useState } from "react";

export const useMountTransition = (isMounted: boolean, delay: number) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isMounted && !isTransitioning) {
      setIsTransitioning(true);
    } else if (!isMounted && isTransitioning) {
      timeoutId = setTimeout(() => setIsTransitioning(false), delay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, isMounted, isTransitioning]);

  return isTransitioning;
};

export const useAppendPortalRoot = (
  body: RefObject<HTMLBodyElement>,
  portalRootRef: RefObject<any>,
) => {
  useEffect(() => {
    (body.current as HTMLBodyElement).appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = body.current as HTMLBodyElement;

    return () => {
      portal.remove();
      bodyEl.style.overflow = "";
    };
  }, []);
};

export const usePreventScroll = (
  ref: RefObject<HTMLBodyElement>,
  isOpen: boolean,
) => {
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        (ref.current as HTMLBodyElement).style.overflow = "hidden";
      } else {
        (ref.current as HTMLBodyElement).style.overflow = "";
      }
    };

    updatePageScroll();
  }, [isOpen]);
};
