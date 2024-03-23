import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "./config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { StatusBar } from "react-native";

import { IntroductionAnimationScreen } from "./introduction_animation";
// screens
import {
  PlantDetail,
  Welcome,
  Signup,
  Login,
  ForgetPass,
  Profile,
  EditProfile,
  ChatBot,
  Settings,
  ExpertHome,
  ExpertSetting,
  CourseList,
  Cources,
  Payment,
  Splash,
  PlantList,
  Card,
  ExpertsListScreen,
  PermissionScreen,
  ChatScreen,
  Home,
  ArticlePage,
  LanguageSelectionScreen,
  Notification,
} from "./screens";
import Tabs from "./navigation/tabs";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createNativeStackNavigator();
// App
const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const getLanguage = async () => {
      try {
        const value = await AsyncStorage.getItem("selectedLanguage");
        if (value !== null) {
          i18n.changeLanguage(value);
          console.log("Language preference retrieved " + value);
        }
      } catch (e) {
        // error reading value
      }
    };
    getLanguage();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        // Fetch userType from Firebase or local storage
        const userTypeRef = doc(database, "users", authUser.uid);
        getDoc(userTypeRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserType(docSnap.data().userType);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        // User is signed out
        setUser(null);
        setUserType(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [loaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "WorkSans-Regular": require("./assets/fonts/WorkSans-Regular.ttf"),
    "WorkSans-Bold": require("./assets/fonts/WorkSans-Bold.ttf"),
    "WorkSans-Medium": require("./assets/fonts/WorkSans-Medium.ttf"),
    "WorkSans-SemiBold": require("./assets/fonts/WorkSans-SemiBold.ttf"),
  });

  if (!loaded || isLoading) {
    return <Splash setIsLoading={setIsLoading} />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={theme}>
        <StatusBar
          backgroundColor={"transparent"}
          translucent
          barStyle="dark-content"
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={user ? "HomeTabs" : "LanguageSelectionScreen"}
        >
          {user && userType === "farmer" ? (
            <>
              <Stack.Screen name="HomeTabs" component={Tabs} />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PlantDetail"
                component={PlantDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ExpertsListScreen"
                component={ExpertsListScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ArticlePage"
                component={ArticlePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChatBot"
                component={ChatBot}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Payment"
                component={Payment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="IntroductionAnimationScreen"
                component={IntroductionAnimationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PlantList"
                component={PlantList}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Card"
                component={Card}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                options={{
                  headerShown: false,
                  cardStyleInterpolator: ({ current, next, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                      overlayStyle: {
                        opacity: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.5],
                        }),
                      },
                    };
                  },
                }}
                component={Settings}
              />
            </>
          ) : user && userType === "expert" ? (
            <>
              <Stack.Screen
                name="ExpertHome"
                component={ExpertHome}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="CourseList"
                component={CourseList}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Cources"
                component={Cources}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ExpertSetting"
                component={ExpertSetting}
                options={{
                  headerShown: false,
                  cardStyleInterpolator: ({ current, next, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                      overlayStyle: {
                        opacity: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 0.5],
                        }),
                      },
                    };
                  },
                }}
              />
            </>
          ) : (
            <>
              {/* Screens */}
              <Stack.Screen
                name="LanguageSelectionScreen"
                component={LanguageSelectionScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgetPass"
                component={ForgetPass}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PermissionScreen"
                component={PermissionScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default AppNavigator;
