import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#0fa92f", // Green
  secondary: "#606d87", // Gray

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  lightGray: "#eff2f5",
  gray: "#BEC1D2",
  red: "#FF0000",
  yellow: "#FFD573",
  lightGreen: "#c4e9c4",
  lightBlue: "#cfe2f3",
  backgroundBlue: "#85A2ED",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Poppins-Medium", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Poppins-Medium", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Poppins-Medium", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Poppins-Medium", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
