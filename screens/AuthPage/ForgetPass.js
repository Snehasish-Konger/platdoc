// ForgetPass.js
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { auth } from "../../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPass = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for the reset link");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/Forgetpass.png")}
            style={{ width: 180, height: 180 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-10">
        <Text className="text-xl font-bold mb-2 text-center">
          Reset Password
        </Text>
        <TextInput
          className="border border-gray-300 p-2 mb-4"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          className="bg-blue-500 p-3 rounded"
          onPress={handleResetPassword}
        >
          <Text className="text-white text-center font-bold">
            Send Reset Link
          </Text>
        </TouchableOpacity>
        {message && (
          <Text className="mt-4 text-center text-sm text-gray-600">
            {message}
          </Text>
        )}
        <View className="flex-row justify-center mt-4">
            <Text className="text-gray-700">Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className="text-blue-500 ml-2">Sign Up</Text>
            </TouchableOpacity>
            </View>
      </View>
    </View>
  );
};

export default ForgetPass;
