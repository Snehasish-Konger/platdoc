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




const Signup = ({ navigation }) => {
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig.extra.WEB_CLIENT_ID,
      androidClientId: Constants.expoConfig.extra.ANDROID_CLIENT_ID,
    });
  }, []);

  const handleGoogleSignUp = async () => {
    try {
      
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
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: '#BCDB8C' }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-2xl ml-4"
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
            style={{ width: 500, height: 490 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-10"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <Text className="text-gray-700 ml-4" style={{ ...FONTS.body1 }}>
          Who are you?
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity
            className="p-2 rounded-full"
            onPress={() => setUserType("expert")}
            style={{
              backgroundColor: userType === "expert" ? "lightblue" : "",
            }}
          >
            <Image
              source={require("../../assets/icons/expert.png")}
              className="w-10 h-10"
            />
            <Text className="text-gray-700 text-center">Expert</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 rounded-full"
            onPress={() => setUserType("farmer")}
            style={{
              backgroundColor: userType === "farmer" ? "lightgreen" : "",
            }}
          >
            <Image
              source={require("../../assets/icons/farmer.png")}
              className="w-10 h-10"
            />
            <Text className="text-gray-700 text-center">Farmer</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-red-500 text-center">{error}</Text>
        <View className="flex-row justify-center">
          <GoogleSigninButton
            style={{ width: 240, height: 50 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSignUp}
            disabled={userType === ""}
          />
        </View>
        {/* <View className="flex-row justify-center mt-7">
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../../assets/icons/facebook.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View> */}
        <View className="flex-row justify-center mt-7">
          <Text
            style={{ ...FONTS.body3 }}
            className="text-gray-500 font-semibold"
          >
            {t("signup.acc")}{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ ...FONTS.body3 }}
          >
            <Text className="text-yellow-400 font-semibold">{t("signup.login")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Signup;
