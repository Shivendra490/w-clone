import React, { useEffect, useMemo, useState } from "react";
import ResponsiveContext from "./context";

const ResponsiveProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 540) {
      setIsMobile(true);
      setIsDrawerOpen(true);
    } else if (width > 1024) {
      setIsDesktop(true);
    } else {
      setIsTablet(true);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (!isMobile && window.innerWidth <= 540) {
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
        setIsDrawerOpen(true);
      } else if (
        !isTablet &&
        window.innerWidth > 540 &&
        window.innerWidth <= 1024
      ) {
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
        setIsDrawerOpen(false);
      } else if (!isDesktop && window.innerWidth > 1024) {
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
        setIsDrawerOpen(false);
      }
    });
    return () => window.removeEventListener("resize", window);
  }, [isDesktop, isMobile, isTablet]);

  const values = useMemo(
    () => ({
      isMobile,
      isDesktop,
      isTablet,
      isDrawerOpen,
    }),
    [isDesktop, isMobile, isTablet, isDrawerOpen]
  );
  return (
    <ResponsiveContext.Provider value={values}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
