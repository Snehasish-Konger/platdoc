import React from "react";
import LottieView from "lottie-react-native";
import { BellIcon, Cog6ToothIcon } from "react-native-heroicons/outline";
import { images, COLORS, FONTS, SIZES } from "../../constants";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ArticlePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: SIZES.padding * 0.5,
          marginBottom: SIZES.padding * 0.5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LottieView
            source={require("../../assets/json/welcome.json")}
            autoPlay
            loop={true}
            className="ml-4"
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h2 }}>PlantDoc</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            className="mr-5"
          >
            <BellIcon size="30" color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            className="mr-5"
          >
            <Cog6ToothIcon size="30" color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.title}>Article Title</Text>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=6",
          }}
          style={styles.image}
        />
        <Text style={styles.date}>Published on January 1, 2024</Text>
        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl
          eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a
          bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis
          tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Duis pharetra luctus lacus ut vestibulum. Maecenas ipsum
          lacus, lacinia quis posuere ut, pulvinar vitae dolor. Integer eu nibh
          at nisi ullamcorper sagittis id vel leo. Integer feugiat faucibus
          libero, at maximus nisl suscipit posuere. Morbi nec enim nunc.
          Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit
          convallis. Cras pharetra mi tristique sapien vestibulum lobortis. Nam
          eget bibendum metus, non dictum mauris. Nulla at tellus sagittis,
          viverra est a, bibendum metus.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: SIZES.padding * 0.5,
  },
  image: {
    width: SIZES.width * 0.9,
    alignContent: "center",
    borderRadius: 20,
    height: 250, // Tailwind: h-64 (approx.)
    marginBottom: 8, // Tailwind: mb-2
  },
  title: {
    fontSize: 24, // Tailwind: text-2xl
    fontWeight: "bold", // Tailwind: font-bold
    marginBottom: 4, // Tailwind: mb-1
    paddingHorizontal: 4, // Tailwind: px-1
  },
  date: {
    fontSize: 16, // Tailwind: text-lg
    marginBottom: 8, // Tailwind: mb-2
    paddingHorizontal: 4, // Tailwind: px-1
    color: "#6b7280", // Tailwind: text-gray-600
  },
  body: {
    fontSize: 16, // Tailwind: text-lg
    paddingHorizontal: 4, // Tailwind: px-1
    color: "#4b5563", // Tailwind: text-gray-700
  },
});

export default ArticlePage;
