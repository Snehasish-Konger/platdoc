import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import Card from "./Card";
import { SIZES, COLORS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { AdjustmentsVerticalIcon } from "react-native-heroicons/outline";

const PlantList = ({ navigation }) => {
  const [plants, setplants] = useState(data);

  function handleAdd() {
    const randomIdx = Math.floor(Math.random() * 5);
    setplants([{ ...data[randomIdx], id: Date.now().toString() }, ...plants]);
  }

  function handleDelete() {
    setplants([...plants.slice(1)]);
  }

  return (
    <View style={{ flex: 1, marginTop: SIZES.padding }}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: SIZES.padding,
          marginBottom: SIZES.padding,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={45}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 30 }}>Recent Analysis</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AdjustmentsVerticalIcon size="30" color={COLORS.black} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          margin: SIZES.padding,
        }}
      >
        <TouchableOpacity onPress={handleAdd}>
          <Text style={{ fontSize: 20, color: COLORS.primary }}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={{ fontSize: 20, color: COLORS.red }}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 18 }}>
          {plants.map((movie) => (
            <Card key={movie.id} {...movie} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const data = [
  {
    id: 1,
    title: "Powdery Mildew",
    description:
      "Powdery mildew is a common fungal disease that affects a wide range of plants. It appears as a white, powdery substance on the leaves, stems, and sometimes flowers of infected plants.",
    posterUrl: "https://picsum.photos/1200/800",
  },
  {
    id: 2,
    title: "Leaf Spot",
    description:
      "Leaf spot is a plant disease that causes dark or light spots to appear on the leaves. It can be caused by various fungi or bacteria and can lead to defoliation if left untreated.",
    posterUrl: "https://picsum.photos/1600/900",
  },
  {
    id: 3,
    title: "Root Rot",
    description:
      "Root rot is a disease that affects the roots of plants, causing them to become discolored, mushy, and eventually die. It is often caused by waterlogged soil and fungal pathogens.",

    posterUrl: "https://picsum.photos/1024/768",
  },
  {
    id: 4,
    title: "Blossom End Rot",
    description:
      "Blossom end rot is a physiological disorder that affects tomatoes and other fruiting vegetables. It causes dark, sunken spots to develop on the bottom of the fruit.",

    posterUrl: "https://picsum.photos/800/600",
  },
  {
    id: 5,
    title: "Aphids Infestation",
    description:
      "Aphids are small insects that feed on the sap of plants. An infestation of aphids can cause leaves to curl, turn yellow, and stunt plant growth.",

    posterUrl: "https://picsum.photos/640/480",
  },
];

export default PlantList;
