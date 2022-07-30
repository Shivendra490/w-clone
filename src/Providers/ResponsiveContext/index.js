import React, { useCallback, useEffect, useMemo, useState } from "react";
import ResponsiveContext from "./context";

const ResponsiveProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(!isDrawerOpen);
  }, [isDrawerOpen]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 600) {
      setIsMobile(true);
      setIsDrawerOpen(true);
    } else if (width > 1024) {
      setIsDesktop(true);
    } else {
      setIsTablet(true);
    }
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      if (!isMobile && window.innerWidth <= 600) {
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (
        !isTablet &&
        window.innerWidth > 600 &&
        window.innerWidth <= 1024
      ) {
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (!isDesktop && window.innerWidth > 1024) {
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [isDesktop, isMobile, isTablet]);

  const values = useMemo(
    () => ({
      isMobile,
      isDesktop,
      isTablet,
      isDrawerOpen,
      toggleDrawer,
    }),
    [isDesktop, isMobile, isTablet, isDrawerOpen, toggleDrawer]
  );
  return (
    <ResponsiveContext.Provider value={values}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveProvider;
