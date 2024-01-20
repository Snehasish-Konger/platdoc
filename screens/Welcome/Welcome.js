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

const { width } = Dimensions.get("window");

const Welcome = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / width);
    if (indexOfNextScreen !== currentPage) {
      setCurrentPage(indexOfNextScreen);
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: COLORS.lightGreen }}
    >
      <View className="flex-1 flex justify-around my-4">
        <Text
          className="text-black text-4xl text-center my-4"
          style={{ ...FONTS.body1 }}
        >
          Let's Get Started!
        </Text>
        <View className="justify-center items-center mt-4 mb-8 flex-1">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            // style={{ flex: 1 }}
          >
            {/* Page 1 */}
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              {/* Your content for page 1 */}
              <Image
                source={require("../../assets/images/welcome.png")}
                style={{ width: 350, height: 350 }}
              />
              <Text
                className="text-black text-4xl text-center"
                style={{ ...FONTS.body1 }}
              >
                Welcome to PlantDoc
              </Text>
              <Text
                className="text-black text-center"
                style={{ ...FONTS.body3 }}
              >
                Your personal plant doctor
              </Text>
            </View>
            <View style={{ width, justifyContent: "center", alignItems: "center" }}>
              <Image source={require("../../assets/images/taking_picture.png")}
              style={{ width: 350, height: 350 }}
              />
              <Text
                className="text-black text-center"
                style={{ ...FONTS.body1 }}
              >
                Take a picture of your plant
              </Text>
            </View>
            <View  style={{ width, justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../../assets/images/diagnosis.png")}
              style={{ width: 350, height: 350 }}
               />
              <Text
                className="text-black text-center"
                style={{ ...FONTS.body1 }}
              >
                Get a diagnosis
              </Text>
              <Text className="text-black text-center" style={{ ...FONTS.body3 }}>
                Get a diagnosis and treatment plan
              </Text>
            </View>
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
            <Text
              style={{ ...FONTS.body2 }}
              className="text-xl text-center text-gray-700"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <Text
              className="text-black font-semibold"
              style={{ ...FONTS.body4 }}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-blue-500"> Log In</Text>
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