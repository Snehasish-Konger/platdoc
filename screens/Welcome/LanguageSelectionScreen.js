import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../i18n";
import { SafeAreaView } from "react-native-safe-area-context";
// import { COLORS, FONTS } from "../../constants";
import { auth, database } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import languageData from "../../locals"; // Adjust the path according to your folder structure

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageSelect = async (langCode) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", langCode);
      console.log("Language preference saved " + langCode);
      setSelectedLanguage(langCode);
      i18n.changeLanguage(langCode);

      // Check if the user is logged in
      const authUser = auth.currentUser; // Use the auth instance to get the current user
      if (authUser) {
        // Set the language in Firestore under the user's document
        const userTypeRef = doc(database, "users", authUser.uid);
        await setDoc(userTypeRef, { language: langCode }, { merge: true });
      }
    } catch (e) {
      // Handle the error, maybe show a message to the user
      console.error("Failed to save the language preference", e);
    }
  };

  const currentLanguageData = languageData[selectedLanguage];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.title}>{currentLanguageData.title}</Text>
      </View>
      <Text style={styles.subtitle}>{currentLanguageData.subtitle}</Text>
      <ScrollView style={styles.container}>
        {Object.entries(languageData).map(([code, { label, script }]) => (
          <TouchableOpacity
            key={code}
            style={[
              styles.languageItem,
              selectedLanguage === code && styles.selectedLanguageItem,
            ]}
            onPress={() => handleLanguageSelect(code)}
          >
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageLabel}>{label}</Text>
              <Text style={styles.languageScript}>{script}</Text>
            </View>
            {selectedLanguage === code && (
              <View style={styles.selectedIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.navigate("PermissionScreen", { selectedLanguage: selectedLanguage })}
          >
            <Text style={styles.acceptButtonText}>
              {currentLanguageData.accept}
            </Text>
          </TouchableOpacity>
        <Text style={styles.termsText}>{currentLanguageData.termsText}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Or any other background color you want for the safe area
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#ccc",
  },
  selectedLanguageItem: {
    backgroundColor: "#e4fcdb", // Color for the selected language item
  },
  languageTextContainer: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  languageScript: {
    fontSize: 16,
    color: "#666",
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "limegreen", // Color for the selected indicator
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f2fdef", // Light grey background for the footer
    padding: 16,
  },
  acceptButton: {
    backgroundColor: "green", // Color for the accept button
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  // ... (other styles remain unchanged)
});

export default LanguageSelectionScreen;
