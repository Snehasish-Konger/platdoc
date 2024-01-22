import "dotenv/config";

export default {
  expo: {
    name: "PlantDoc",
    description:
      "PlantDoc is an App-Based Solution to identify and solve disease in plants/crops",
    slug: "PlantDoc",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/adaptive-icon.png",
    userInterfaceStyle: "light",
    scheme: "PlantDoc",
    splash: {
      lottie: "./assets/splashAnim.json",
      resizeMode: "cover",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.plantdoc.app",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      palmURL: process.env.PALM_URL,
      palmKey: process.env.PALM_KEY,
      weatherKey: process.env.WEATHER_KEY,
      WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
      ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
      eas: {
        projectId: "76884007-6226-46d0-9cca-99e3e5df181a",
      },
    },
  },
};
