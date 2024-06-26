import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { SIZES, COLORS } from "../../constants";

const CourseList = ({navigation, img, title, time, desc, bg, onPress }) => {
  onPress = () => {
    navigation.navigate("Chapter");
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        backgroundColor: bg,
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Image source={img} style={{ width: 40, height: 40 }} />

      <View>
        <Text
          style={{
            color: COLORS.black,
            fontSize: 13,
            paddingHorizontal: 20,
            width: 240,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: COLORS.secondary,
            fontSize: 12,
            paddingHorizontal: 20,
            width: 250,
          }}
        >
          {desc}
        </Text>
        <Text
          style={{
            color: "#f58084",
            fontSize: 12,
            paddingHorizontal: 20,
          }}
        >
          {time}
        </Text>
      </View>
      <Text
        style={{
          color: "#345c74",
          fontSize: 13,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        25%
      </Text>
      <ProgressCircle
        percent={30}
        radius={17}
        borderWidth={1.5}
        color="f580084"
        shadowColor="#FFF"
        bgColor="#FFF"
      >
        <Image source={require("../../assets/images/pl.png")} />
      </ProgressCircle>
    </TouchableOpacity>
  );
};
export default CourseList;
