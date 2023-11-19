import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

const Settings = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    // Set up a listener for the authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [
    i18n,
    selectedLanguage,
  ]);

  const navigateToEditProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const navigateToNotifications = () => {
    console.log("Notifications function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };

  const navigateToSubscription = () => {
    navigation.navigate("Payment");
  };

  const navigateToSupport = () => {
    console.log("Support function");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms and Policies function");
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };
  const navigateToLanguage = () => {
    setLanguageModalVisible(true);
  };

  const logout = async () => {
    try {
      await auth.signOut(); // Sign out the user
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Edit Profile",
      action: navigateToEditProfile,
    },
    { icon: "security", text: "Security", action: navigateToSecurity },
    {
      icon: "notifications-none",
      text: "Notifications",
      action: navigateToNotifications,
    },
    { icon: "lock-outline", text: "Privacy", action: navigateToPrivacy },
  ];

  const supportItems = [
    {
      icon: "credit-card",
      text: "My Subscription",
      action: navigateToSubscription,
    },
    { icon: "help-outline", text: "Help & Support", action: navigateToSupport },
    {
      icon: "info-outline",
      text: "Terms and Policies",
      action: navigateToTermsAndPolicies,
    },
  ];

  const actionsItems = [
    {
      icon: "language",
      text: "Change the Language",
      action: navigateToLanguage,
    },
    {
      icon: "outlined-flag",
      text: "Report a problem",
      action: navigateToReportProblem,
    },
    { icon: "logout", text: "Log out", action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
      }}
    >
      <MaterialIcons name={icon} size={30} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.body4,
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>Settings</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h3, marginVertical: 10 }}>Account</Text>
          <View className="rounded-2xl">
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h3, marginVertical: 10 }}>
            Support & About{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={languageModalVisible}
          onRequestClose={() => {
            setLanguageModalVisible(!languageModalVisible);
          }}
        >
          <View className="flex-1 justify-end">
            <View className="m-5 bg-white rounded-lg p-8 items-center shadow-lg">
              <TouchableOpacity
                onPress={() => setLanguageModalVisible(!languageModalVisible)}
                className="absolute top-5 right-5"
              >
                <MaterialIcons name="close" size={30} color="black" />
              </TouchableOpacity>
              <Text className="mb-4 text-center text-lg">Select Language</Text>

              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
                className="w-full"
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="हिन्दी" value="hi" />
                <Picker.Item label="বাংলা" value="bn" />
                {/* Add more languages here */}
              </Picker>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
