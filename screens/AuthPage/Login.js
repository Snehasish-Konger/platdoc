import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { COLORS, FONTS } from "../../constants";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, database } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  GoogleSignin,
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

  const handleFacebookLogin = async () => {
    alert("We are working on this feature, please use Google login");
  };

  return (
    <View className="flex-1 bg-[#fdffe8]">
      <View className="flex-row  items-center top-10 justify-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="ml-4 absolute left-4 top-10"
        >
          <ArrowLeftIcon size="30" color="black" />
        </TouchableOpacity>
        <View className="flex-col items-center justify-center top-6">
          <Text style={{ ...FONTS.h1 }} className="text-center top-10">
            {t("login.title")}
          </Text>
          <LottieView
            source={require("../../assets/json/login_welcome.json")}
            autoPlay
            loop
            style={{ width: 500, height: 500 }}
          />
        </View>
      </View>
      <View className="flex-1 align-middle justify-end">
        {isLoggingIn ? (
          <View className="flex-1 justify-center items-center bg-white rounded-t-3xl">
            <LottieView
              source={require("../../assets/json/login.json")}
              autoPlay
              loop
              style={{ width: 500, height: 500 }}
            />
          </View>
        ) : (
          <View className="flex-1 justify-center items-center px-8 pt-10 bg-white rounded-t-3xl">
            <Text
              className=" ml-4 mb-6 justify-center text-center"
              style={{ ...FONTS.body2 }}
            >
              We're glad to see you back! Please login to continue
            </Text>
            <View className="flex-row justify-center items-center">
              <TouchableOpacity
                onPress={() => handleGoogleLogin()}
                className="flex-row mr-2 p-4 rounded-2xl justify-center items-center bg-white shadow-lg border border-gray-200"
              >
                <Text style={{ ...FONTS.body3 }}>Login with</Text>
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={{ width: 50, height: 50, marginLeft: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFacebookLogin()}
                className="flex-row p-4 rounded-2xl justify-center items-center bg-white shadow-lg border border-gray-200"
              >
                <Text style={{ ...FONTS.body3 }}>Login with </Text>
                <Image
                  source={require("../../assets/icons/facebook.png")}
                  style={{ width: 50, height: 50, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-center mt-7">
              <Text style={{ ...FONTS.body3 }}>{t("login.acc")} </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className="text-blue-700" style={{ ...FONTS.body3 }}>
                  {" "}
                  {t("login.signup")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;
