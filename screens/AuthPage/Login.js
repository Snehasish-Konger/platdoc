import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { COLORS, FONTS } from "../../constants";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth, database } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

const Login = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig.extra.WEB_CLIENT_ID,
      androidClientId: Constants.expoConfig.extra.ANDROID_CLIENT_ID,
    });
  }, []);

  const handleGoogleLogin = async () => {
    console.log("Google login");
    try {
      setIsLoggingIn(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken
      );
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;
      const userRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(userRef);

      setIsLoggingIn(false);
      if (!docSnap.exists()) {
        // User not found in database, navigate to signup page
        console.log("User not found, redirecting to signup page");
        navigation.navigate("Signup");
      } else {
        console.log("Google login success");
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError("Sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError("Sign in in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError("Play services not available");
      } else {
        setError(error.message);
        console.log(error.message);
      }
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: "#FFE4CF" }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ ...FONTS.h1 }} className="text-center font-bold">
          {t("login.title")}
        </Text>
      </SafeAreaView>
      <View className="flex-1 align-middle justify-end">
        {isLoggingIn ? (
          <View className="flex-1 justify-center items-center">
            <LottieView
              source={require("../../assets/json/welcome.json")}
              autoPlay
              loop
              style={{ width: 500, height: 500 }}
            />
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <GoogleSigninButton
              style={{ width: 250, height: 60 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => handleGoogleLogin()}
            />
            <Text className="text-gray-500 text-lg">{t("login.acc")} </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text className="text-blue-700 text-lg">
                {" "}
                {t("login.signup")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Image
          className="flex-1 justify-center bottom-0"
          source={require("../../assets/images/login.png")}
          style={{ width: 500, height: 490 }}
        />
      </View>
    </View>
  );
};
export default Login;
