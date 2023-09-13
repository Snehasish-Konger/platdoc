import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ChatBot, Home, Profile, Weather} from "../screens/";
const Drawer = createDrawerNavigator();


const DrawerRoutes = () => {
    return (
            <Drawer.Navigator
                screenOptions = {({
                    headerShown: false,
                    drawerType: 'slide',
                    drawerStyle: {
                        width: '50%',
                    },
                    overlayColor: 'transparent',
                    drawerActiveTintColor: 'white',
                    drawerInactiveTintColor: 'white',
                    drawerActiveBackgroundColor: 'transparent',
                    drawerInactiveBackgroundColor: 'transparent',
                    drawerLabelStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                    drawerHideStatusBarOnOpen: true,
                })}
                initialRouteName="Home"

            >
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Weather" component={Weather} />
                <Drawer.Screen name="ChatBot" component={ChatBot} />
                
            </Drawer.Navigator>
    )
}

export default DrawerRoutes;
