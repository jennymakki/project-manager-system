import { useEffect, useState } from "react";
import { breakpoints } from "../breakpoints";

export function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < breakpoints.mobile,

    isTablet:
      width >= breakpoints.mobile &&
      width < breakpoints.tablet,

    isDesktop: width >= breakpoints.tablet,
  };
}