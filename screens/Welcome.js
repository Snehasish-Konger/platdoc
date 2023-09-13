import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants";

export default function Welcome({ navigation }) {
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.primary }}
    >
      <View className="flex-1 flex justify-around my-4">
        <Text
          className="text-white text-4xl text-center"
          style={{ ...FONTS.body1 }}
        >
          Let's Get Started!
        </Text>
        <View className="justify-center flex-col items-center">
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: 350, height: 350 }}
          />
          <Text
            className="text-white text-4xl text-center"
            style={{ ...FONTS.body1 }}
          >
            Welcome to PlantDoc
          </Text>
          <Text className="text-white text-center" style={{ ...FONTS.body3 }}>
            Your personal plant doctor
            </Text>
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            className="py-3 bg-yellow-400 mx-7 rounded-xl"
          >
            <Text
              style={{ ...FONTS.body2 }}
              className="text-xl text-center text-gray-700"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text
              className="text-white font-semibold"
              style={{ ...FONTS.body4 }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-400"> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
