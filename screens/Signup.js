import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, {useState} from "react";
import { COLORS, FONTS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, database } from "../config/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

// subscribe for more videos like this :)
export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  

  const handleSignUp = async () => {
    console.log("sign up");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: name,
          email: email,
          password: password,
          uid: user.uid,
        });
      }
        console.log("sign up success");
    } catch (error) {
      setError(error.message);
    }
    };

  const handleGoogleSignUp = async () => {
    console.log("google sign up");
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await auth.signInWithPopup(auth, provider);
      const user = userCredential.user;
      const userRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          password: "",
          uid: user.uid,
        });
      }
      console.log("google sign up success");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: COLORS.primary }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-10"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4" style={{...FONTS.body3}}>Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            style={{...FONTS.body3}}
            value={name}
            placeholder="Enter Name"
            onChangeText={(text) => setName(text)}
          />
          <Text className="text-gray-700 ml-4" style={{...FONTS.body3}}>Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            style={{...FONTS.body3}}
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text className="text-gray-700 ml-4" style={{...FONTS.body3}}>Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            value={password}
            style={{...FONTS.body3}}
            placeholder="Enter Password"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress = {handleSignUp}
          >
            <Text className="font-xl font-bold text-center text-gray-700" style={{...FONTS.body2}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" 
            onPress={handleGoogleSignUp}>
            <Image
              source={require("../assets/icons/google.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image
              source={require("../assets/icons/facebook.png")}
              className="w-10 h-10"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
