import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Modalize } from "react-native-modalize";
import CourseList from "./CourseList";
import {FONTS, COLORS, SIZES} from '../../constants'
import { GestureHandlerRootView ,TapGestureHandler } from "react-native-gesture-handler";

const Cources = ({ navigation }) => {
  return (
    <GestureHandlerRootView>
    <TapGestureHandler>
    <ImageBackground
      source={require("../../assets/images/cat.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: 20,
          marginTop: SIZES.padding * 1.5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: "#8bbcdb",
          }}
        >
          <Image
            source={require("../../assets/images/a1.png")}
            style={{ width: 20, height: 15 }}
          />
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: "#8bbcdb",
            marginLeft: 360,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Image
            source={require("../../assets/images/hum.png")}
            style={{ height: 15, width: 20 }}
          />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: "#FFF",
          fontSize: 35,
          width: 200,
          alignSelf: "center",
          textAlign: "center",
          marginTop: 34,
        }}
      >
        UI/UX Cources
      </Text>

      <Modalize
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
        }}
        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}
        alwaysOpen={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={{ marginTop: 40 }}>
          <CourseList
            onPress={() => navigation.navigate("Xd")}
            img={require("../../assets/images/xd.png")}
            title="Adobe XD Prototyping"
            bg="#fdddf3"
          />
          <CourseList
            img={require("../../assets/images/sketch.png")}
            title="Sketch shortcuts and tricks"
            bg="#fef8e3"
          />
          <CourseList
            img={require("../../assets/images/ae.png")}
            title="UI Motion Design in After Effects"
            bg="#fcf2ff"
          />
          <CourseList
            img={require("../../assets/images/f.png")}
            title="Figma Essentials"
            bg="#fff0ee"
          />
          <CourseList
            img={require("../../assets/images/ps.png")}
            title="Adobe Photoshop. Retouching"
            bg="#fdddf3"
          />
          <CourseList
            img={require("../../assets/images/sketch.png")}
            title="Sketch shortcuts and tricks"
            bg="#fef8e3"
          />
          <CourseList
            img={require("../../assets/images/ae.png")}
            title="UI Motion Design in After Effects"
            bg="#fcf2ff"
          />
        </View>
      </Modalize>
    </ImageBackground>
    </TapGestureHandler>
    </GestureHandlerRootView>
  );
};
export default Cources;
