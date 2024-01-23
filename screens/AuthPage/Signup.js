import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  signInWithCredential,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth, database } from "../../config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleSignin,
  GoogleSigninButton,
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

  return (
    <View className="flex-1" style={{ backgroundColor: "#BCDB8C" }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-green-100 p-2 rounded-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ ...FONTS.h1 }} className="text-center font-bold">
          {t("signup.title")}
        </Text>
        <View className="flex-row justify-center relative top-10">
          <Image
            source={require("../../assets/images/signup.png")}
            style={{ width: 500, height: 500 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white top-0 px-8 pt-10">
        <Text
          className="text-gray-700 ml-4 mb-6 justify-center"
          style={{ ...FONTS.body1 }}
        >
          {t("signup.question")}
        </Text>
        <View className="flex-row justify-center space-x-12">
          <View className="flex flex-col items-center">
            <TouchableOpacity
              className="p-4 rounded-full"
              onPress={() => setUserType("expert")}
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
            <Text className="text-gray-700 text-center text-base">Expert</Text>
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
            <Text className="text-gray-700 text-center text-base">Farmer</Text>
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
            <GoogleSigninButton
              style={{ width: 240, height: 50 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleGoogleSignUp}
              disabled={userType === ""}
            />
            <Text className="text-gray-500 text-lg mt-7">
              {t("signup.acc")}{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-lime-600 text-lg">{t("signup.login")}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default Signup;
