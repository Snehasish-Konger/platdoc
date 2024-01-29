import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { images, icons, COLORS, FONTS, SIZES } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";

const expertsData = [
  {
    id: "1",
    name: "Dr. Olivia Greene",
    specialty: "Orchidaceae Researcher",
    img: images.profile1,
  },
  {
    id: "2",
    name: "Dr. John Doe",
    specialty: "Orchidaceae Researcher",
    img: images.profile2,
  },
  {
    id: "3",
    name: "Dr. Jane Doe",
    specialty: "Orchidaceae Researcher",
    img: images.profile3,
  },
  {
    id: "4",
    name: "Dr. John Smith",
    specialty: "Orchidaceae Researcher",
    img: images.profile4,
  },
  {
    id: "5",
    name: "Dr. Jane Smith",
    specialty: "Orchidaceae Researcher",
    img: images.profile5,
  },
  {
    id: "6",
    name: "Dr. Jane Smith",
    specialty: "Orchidaceae Researcher",
    img: images.profile5,
  },
  {
    id: "7",
    name: "Dr. John Smith",
    specialty: "Orchidaceae Researcher",
    img: images.profile4,
  },
];

const ExpertItem = ({ name, specialty, img, navigation }) => (
  <TouchableOpacity
    style={styles.expertItem}
    onPress={() => {
      navigation.navigate("ChatScreen", { name, img });
    }}
  >
    <Image source={img} style={styles.expertImage} />
    <View style={styles.expertTextContainer}>
      <Text style={styles.expertName}>{name}</Text>
      <Text style={styles.expertSpecialty}>{specialty}</Text>
    </View>
    <Image source={icons.phone} style={styles.icon} />
      <ChatBubbleOvalLeftEllipsisIcon size={30} color={COLORS.black} />
  </TouchableOpacity>
);

const ExpertsListScreen = ({ navigation }) => {
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
        <TouchableOpacity
          style={{ marginLeft: SIZES.padding * 0.5 }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftCircleIcon color="black" size={30} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <QuestionMarkCircleIcon color="black" size={30} />
          <Text style={{ ...FONTS.h2 }}>Ask an Expert</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>
      <TextInput
        placeholder="🔍 Search plant expert..."
        placeholderTextColor={COLORS.gray}
        style={styles.searchInput}
      />
      <FlatList
        data={expertsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ExpertItem
            name={item.name}
            specialty={item.specialty}
            img={item.img}
            navigation={navigation} // Assuming 'navigation' is passed down through props
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: SIZES.padding * 0.5,
    marginVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.lightGray,
  },
  expertItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  expertTextContainer: {
    flex: 1,
    marginLeft: SIZES.margin,
  },
  expertName: {
    ...FONTS.h2,
  },
  expertSpecialty: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
  expertImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.padding,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
  },
});

export default ExpertsListScreen;
