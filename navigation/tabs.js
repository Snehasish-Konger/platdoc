import React, { useState } from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatBot, Home, Profile, Weather } from "../screens/";
import { pickImage, pickImageFromGallery } from "../utils/imgpick";
import {
  HomeIcon,
  CloudIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  CameraIcon,
  HeartIcon,
  UserCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  CreditCardIcon,
} from "react-native-heroicons/outline";
import { COLORS } from "../constants";
import Payment from "../screens/Payment";
const Tab = createBottomTabNavigator();

// const tabOptions = {
//     showLabel: false,
//     style: {
//         height: "10%",
//     },
// };

const CameraButton = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: COLORS.primary,
        // marginBottom: 10,
      }}
    >
      <CameraIcon size="40" color={COLORS.white} />
    </View>
  );
};

const Tabs = ({ navigation, image }) => {
  const handleImage = async () => {
    let result = await pickImageFromGallery();
    if (!result.canceled) {
      navigation.navigate("IntroductionAnimationScreen", { image: result.uri });
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: "7%",
          width: "100%",
          alignSelf: "center",
          display: "flex",
          justifyContent: "center",
        },
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.black;

          switch (route.name) {
            case "Home":
              return <HomeIcon size="35" color={tintColor} />;
            case "Cloud":
              return <CloudIcon size="35" color={tintColor} />;
            case "Camera":
              return (
                <TouchableOpacity onPress={handleImage}>
                  <CameraButton />
                </TouchableOpacity>
              );
            case "Search":
              return <MagnifyingGlassIcon size="35" color={tintColor} />;
            case "Favourite":
              return <HeartIcon size="35" color={tintColor} />;
            case "Community":
              return <UserGroupIcon size="35" color={tintColor} />;
            case "ChatBot":
              return <ChatBubbleLeftEllipsisIcon size="35" color={tintColor} />;
            case "Profile":
              return <UserCircleIcon size="35" color={tintColor} />;
            case "Drawer":
              return <CursorArrowRaysIcon size="35" color={tintColor} />;
            case "Payment":
              return <CreditCardIcon size="35" color={tintColor} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cloud" component={Weather} />
      <Tab.Screen name="Camera" component={Home} />
      <Tab.Screen name="Community" component={Profile} />
      <Tab.Screen name="Payment" component={Payment} />
    </Tab.Navigator>
  );
};

export default Tabs;
