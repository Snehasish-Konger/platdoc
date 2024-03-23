import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import { COLORS, FONTS } from "../../constants";
import messaging from "@react-native-firebase/messaging";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const PermissionScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const { t } = useTranslation();
  const permissions = [
    {
      name: t("permissions.notifications.name"),
      description: t("permissions.notifications.description"),
      json: require("../../assets/json/notifications.json"),
      permissionType: "notifications",
      requestPermission: async () => await messaging().requestPermission(), // FCM permission request
    },
    {
      // Location permission object
      name: t("permissions.location.name"),
      description: t("permissions.location.description"),
      json: require("../../assets/json/location.json"),
      permissionType: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      requestPermission: async () => {
        if (Platform.OS === "android") {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Location Permission",
                message: "This app needs access to your location.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
              }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            alert("Location permission denied");
            console.warn(err);
            return false;
          }
        } else {
          // iOS-specific permission handling if necessary
          return true; // Placeholder return, adjust based on actual iOS handling
        }
      },
    },
    {
      name: t("permissions.camera_storage.name"),
      description: t("permissions.camera_storage.description"),
      json: require("../../assets/json/storage.json"),
      permissionType: PermissionsAndroid.PERMISSIONS.CAMERA,
      requestPermission: async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      },
    },
    // Add other permissions as needed
  ];

  const handleAllow = async (index) => {
    const permission = permissions[index];
    const isGranted = await permission.requestPermission();

    if (isGranted) {
      // Permission granted, move to the next permission
      if (index < permissions.length - 1) {
        scrollViewRef.current?.scrollTo({
          x: width * (index + 1),
          animated: true,
        });
      } else {
        // All permissions have been processed, navigate to the Welcome page
        navigation.navigate("Welcome");
      }
    } else {
      // Permission denied, handle as needed
    }
  };

  const handleSkip = (index) => {
    // Skip to the next permission or go to Welcome page if it's the last permission
    if (index < permissions.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (index + 1),
        animated: true,
      });
    } else {
      navigation.navigate("Welcome");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGreen }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {permissions.map((permission, index) => (
          <View
            key={index}
            style={{ width, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              source={permission.json}
              autoPlay
              loop={true}
              style={{ width: 450, height: 450 }}
            />
            <Text
              style={{ ...FONTS.h1 }}
              className="text-black text-4xl text-center pt-5"
            >
              {permission.name}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                marginHorizontal: 20,
                textAlign: "center",
              }}
              className="text-black text-center pt-5"
            >
              {permission.description}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleSkip(index)}
                style={styles.skipButton}
              >
                <Text
                  style={{ ...FONTS.body2 }}
                  className="text-gray-900 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  {t("permissions.skip")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAllow(index)}
                style={styles.allowButton}
              >
                <Text
                  style={{ ...FONTS.body2 }}
                  className="text-white bg-green-700  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {t("permissions.allow")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (other styles remain unchanged)
  buttonContainer: {
    position: "absolute", // Use absolute to position the buttons over the ScrollView
    bottom: 20, // Distance from the bottom of the screen
    left: 0, // Align to the left side
    right: 0, // Align to the right side
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Padding on the sides
  },
  // ... (other styles remain unchanged)
});

export default PermissionScreen;
