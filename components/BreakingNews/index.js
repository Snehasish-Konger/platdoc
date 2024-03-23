import { View, Text, Dimensions } from "react-native";
import React from "react";
import Carousal from "react-native-snap-carousel";
import BreakingNewsCard from "./BreakingNewsCard";

var { width } = Dimensions.get("window");

export default function BreakingNews({ navigation }) {
  const handleClick = () => {
    navigation.navigate("ArticlePage");
  };

  return (
    <View>
      {/* Carousal */}
      <Carousal
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => {
          return <BreakingNewsCard handleClick={handleClick} />;
        }}
        sliderWidth={width}
        itemWidth={width}
        layout="default"
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        enableSnap={true}
      />
    </View>
  );
}
