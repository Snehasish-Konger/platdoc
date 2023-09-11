import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// screens
import { PlantDetail } from "./screens";
// extra screens
import Tabs from "./navigation/tabs";

import { useFonts } from 'expo-font'; 

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {
    const [loaded] = useFonts({
        "AdventPro-Black" : require('./assets/fonts/AdventPro-Black.ttf'),
        "AdventPro-Bold" : require('./assets/fonts/AdventPro-Bold.ttf'),
        "AdventPro-Regular" : require('./assets/fonts/AdventPro-Regular.ttf'),
    })

    if(!loaded){
        return null;
    }
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'HomeTabs'}
            >
                {/* Tabs */}
                <Stack.Screen name="HomeTabs" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="PlantDetail" component={PlantDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default () => {
    return <App />;
};
