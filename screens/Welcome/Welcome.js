import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../../constants";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const Welcome = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation();

  const handleScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setCurrentPage(indexOfNextScreen);
    }
  };

  const scripts = [
    {
      title: t("welcome.title1"),
      subtitle: t("welcome.subtitle1"),
      json: require("../../assets/json/welcome.json"),
    },
    {
      title: t("welcome.title2"),
      subtitle: t("welcome.subtitle2"),
      json: require("../../assets/json/scanning.json"),
    },
    {
      title: t("welcome.title3"),
      subtitle: t("welcome.subtitle3"),
      json: require("../../assets/json/diagnosis.json"),
    },
  ];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.lightGreen }}
    >
      <View className="flex-1 flex justify-around my-4">
        <View className="justify-center items-center mt-4 mb-8 flex-1">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            // style={{ flex: 1 }}
          >
            {scripts.map((script, index) => (
              <View
                key={index}
                style={{
                  width,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Your content for page 1 */}
                <LottieView
                  source={script.json}
                  autoPlay
                  loop={true}
                  style={{ width: 450, height: 450 }}
                />
                <Text className="text-center pt-5" style={{ ...FONTS.body1 }}>
                  {script.title}
                </Text>
                <Text className=" text-center pt-5" style={{ ...FONTS.body3 }}>
                  {script.subtitle}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.pagination}>
          {Array.from({ length: 3 }).map(
            (
              _,
              index // Assuming there are 3 pages
            ) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentPage === index
                    ? styles.paginationDotActive
                    : styles.paginationDotInactive,
                ]}
              />
            )
          )}
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            className="py-3 bg-green-400 mx-7 rounded-xl"
          >
            <Text style={{ ...FONTS.body2 }} className="text-center ">
              {t("welcome.signup")}
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text style={{ ...FONTS.body3 }}>{t("welcome.script")} </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className=" text-blue-500 text-lg"
                style={{ ...FONTS.body3 }}
              >
                {t("welcome.login")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 200, // Adjust the position as needed
    alignSelf: "center",
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  paginationDotActive: {
    backgroundColor: COLORS.primary,
  },
  paginationDotInactive: {
    backgroundColor: "grey",
  },
});
export default Welcome;
