import { TouchableWithoutFeedback, Image, Text, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

export default function BreakingNewsCard() {
  return (
    <TouchableWithoutFeedback>
      <View className="relative left-3">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=6",
          }}
          style={{
            width: SIZES.padding * 18,
            height: SIZES.padding * 9,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: SIZES.padding * 18,
            height: "100%",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Title and Author */}
        <View className="absolute bottom-6 left-4 justify-end h-[80%]">
          <View className=" space-y-1">
            <View className=" max-w-[98%]">
              <Text className="text-white text-base font-semibold capitalize">
                News Title
              </Text>
            </View>

            <View className="">
              <Text className="text-neutral-300 text-sm font-medium">
                Author Name
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
