import React, { useState } from "react";
import { View, Text, Image, Touchable } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatBot, Home, Weather} from "../screens/";
import { pickImage, pickImageFromGallery } from '../utils/imgpick';
import {HomeIcon,CloudIcon, UserGroupIcon, MagnifyingGlassIcon, CameraIcon, HeartIcon} from "react-native-heroicons/outline";
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
    },
};

const CameraButton = () => {
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: COLORS.primary,
            }}
        >
            <CameraIcon size="30" color={COLORS.white}/>
        </View>
    );
};

const Tabs = () => {
    const [image, setImage] = useState(null);
    const handleImage = async () => {
        let result = await pickImageFromGallery();
        // let result = await pickImage();
        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: "10%",
                    width: "100%",
                    alignSelf: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarIcon: ({ focused }) => {
                    const tintColor = focused ? COLORS.primary : COLORS.gray;

                    switch (route.name) {
                        case "Home":
                            return (
                                <HomeIcon size="35" color={tintColor}/>
                            );
                        case "Cloud":
                            return (
                                <CloudIcon size="35" color={tintColor}/>
                            );
                        case "Camera":
                            return (
                                <TouchableOpacity onPress={handleImage}>
                                <CameraButton />
                                </TouchableOpacity>
                            );
                        case "Search":
                            return (
                                <MagnifyingGlassIcon size="35" color={tintColor}/>
                            );
                        case "Favourite":
                            return (
                                <HeartIcon size="35" color={tintColor}/>
                            );
                        case "Community":
                            return (
                                <UserGroupIcon size="35" color={tintColor}/>
                            );
                    }
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="Cloud"
                component={Weather}
            />
            <Tab.Screen
                name="Camera"
                component={Home}
            />
            <Tab.Screen
                name="Search"
                component={Home}
            />
            <Tab.Screen
                name="Community"
                component={ChatBot}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
