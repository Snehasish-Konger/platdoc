import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebaseConfig";
// import * as SplashScreen from 'expo-splash-screen';
// import SplashScreenComponent from "./components/SplashScreenComponent";

// screens
import {
  PlantDetail,
  Welcome,
  Signup,
  Login,
  Profile,
  ChatBot,
  Settings,
  ExpertHome,
  // ExpertProfile,
  CourseList,
  Cources,
} from "./screens";
// extra screens
import Tabs from "./navigation/tabs";
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

// import DrawerRoutes from "./navigation/drawers";

import { useFonts } from "expo-font";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();
const App = () => {
  const [user, setUser] = useState(null);
  // const [splashFinished, setSplashFinished] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    }
  }, []);

  const [loaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

//   if (!splashFinished) {
//     return <SplashScreenComponent onFinish={() => setSplashFinished(true)} />;
// };

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={user ? "HomeTabs" : "Welcome"}
      >
        {/* Tabs */}
        {user ? (
          <>
            <Stack.Screen name="HomeTabs" component={Tabs} />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChatBot"
              component={ChatBot}
              options={{ headerShown: false }}
            />
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
            {/* <Stack.Screen name ="HomeTabs" component={DrawerRoutes} /> */}
          </>
        ) : (
          <>
            {/* Screens */}
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
          </>
        )}
        <Stack.Screen
          name="PlantDetail"
          component={PlantDetail}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
