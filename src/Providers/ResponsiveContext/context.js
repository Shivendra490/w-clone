import { createContext, useContext } from "react";

const initialValue = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
};

const responsiveContext = createContext(initialValue);

export const useResponsiveContext = () => useContext(responsiveContext);

export default responsiveContext;
