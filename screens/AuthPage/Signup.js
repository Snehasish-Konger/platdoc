import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../constants";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth, database } from "../../config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

const Signup = ({ navigation }) => {
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig.extra.WEB_CLIENT_ID,
      androidClientId: Constants.expoConfig.extra.ANDROID_CLIENT_ID,
    });
  }, []);

  const handleGoogleSignUp = async () => {
    try {
      setIsSigningUp(true);
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
      setIsSigningUp(false);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          password: "",
          uid: user.uid,
          userType: userType,
        });
      }

      console.log("Google sign up success");
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

  const handleFacebookSignUp = async () => {
    alert("Facebook signup is not available yet");
  };
  return (
    <View className="flex-1 bg-[#f6f8cf]">
      <View className="flex-row items-center justify-center top-10">
        {/* <ImageBackground
          source={require("../../assets/images/signup.png")}
          style={{ width: 500, height: 500 }}
        > */}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" ml-4 absolute left-4 top-10"
        >
          <ArrowLeftIcon size="30" color="black" />
        </TouchableOpacity>
        <View className="flex-col items-center justify-center top-6">
          <Text style={{ ...FONTS.h1 }} className="text-center top-10">
            {t("signup.title")}
          </Text>
          <LottieView
            source={require("../../assets/json/signup_welcome.json")}
            autoPlay
            loop
            style={{ width: 500, height: 500 }}
          />
        </View>
        {/* </ImageBackground> */}
      </View>
      <View className="flex-1 px-8 pt-10 bg-white rounded-t-3xl">
        <Text className=" ml-4 mb-6 justify-center" style={{ ...FONTS.body1 }}>
          {t("signup.question")}
        </Text>
        <View className="flex-row justify-center space-x-12">
          <View className="flex flex-col items-center">
            <TouchableOpacity
              className="p-4 rounded-full"
              // onPress={() => setUserType("expert")}
              // On press show a message that this feature is not available yet
              onPress={() => alert("We're still working on the expert side!")}
              style={{
                backgroundColor:
                  userType === "expert" ? "lightblue" : "transparent",
              }}
            >
              <Image
                source={require("../../assets/icons/expert.png")}
                className="w-20 h-20"
              />
            </TouchableOpacity>
            <Text className="text-center" style={{ ...FONTS.body4 }}>
              {t("signup.expert")}
            </Text>
          </View>
          <View className="flex flex-col items-center">
            <TouchableOpacity
              className="p-4 rounded-full"
              onPress={() => setUserType("farmer")}
              style={{
                backgroundColor:
                  userType === "farmer" ? "lightgreen" : "transparent",
              }}
            >
              <Image
                source={require("../../assets/icons/farmer.png")}
                className="w-20 h-20"
              />
            </TouchableOpacity>
            <Text className="text-center" style={{ ...FONTS.body4 }}>
              {t("signup.farmer")}
            </Text>
          </View>
        </View>
        {isSigningUp ? (
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
            <View className="flex-row justify-center items-center">
              <TouchableOpacity
                onPress={() => handleGoogleSignUp()}
                className="flex-row mr-2 p-4 rounded-2xl justify-center items-center bg-white shadow-lg border border-gray-200"
              >
                <Text style={{ ...FONTS.body3 }}>Signup with</Text>
                <Image
                  source={require("../../assets/icons/google.png")}
                  style={{ width: 50, height: 50, marginLeft: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleFacebookSignUp()}
                className="flex-row p-4 rounded-2xl justify-center items-center bg-white shadow-lg border border-gray-200"
              >
                <Text style={{ ...FONTS.body3 }}>Signup with </Text>
                <Image
                  source={require("../../assets/icons/facebook.png")}
                  style={{ width: 50, height: 50, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-center mt-7">
              <Text style={{ ...FONTS.body3 }}>{t("signup.acc")} </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-lime-600" style={{ ...FONTS.body3 }}>
                  {t("signup.login")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default Signup;
