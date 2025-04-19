import "dotenv/config";

export default {
  expo: {
    scheme: "acme",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    web: {
      bundler: "metro",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    ios: {
      supportsTablet: true,
    },
    plugins: ["expo-router"],
    name: "demo-expo",
    slug: "demo-expo",
  },
  extra: {
    apiUrl: process.env.API_URL,
    rapidApiHost: process.env.RAPID_API_HOST,
    rapidApiKey: process.env.RAPID_API_KEY,
  },
};
