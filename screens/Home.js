import React, { useState, useRef, useEffect } from "react";
import { ArrowRightCircleIcon, BellIcon, Cog6ToothIcon, } from "react-native-heroicons/outline";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LottieView from "lottie-react-native";
const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Set up a listener for the authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  // Dummy Data
  const [newPlants, setNewPlants] = useState([
    {
      id: 0,
      name: "Net Blitch",
      img: images.plant1,
    },
    {
      id: 1,
      name: "Stripe rust",
      img: images.plant2,
    },
    {
      id: 2,
      name: "Leaf Spot",
      img: images.plant3,

    },
    {
      id: 3,
      name: "Disease 4",
      img: images.plant4,
    },
    {
      id: 4,
      name: "Disease 5",
      img: images.plant5,
    },
    {
      id: 5,
      name: "Disease 6",
      img: images.plant6,
    },
    {
      id: 6,
      name: "Disease 7",
      img: images.plant7,
    },
    {
      id: 7,
      name: "Disease 8",
      img: images.plant1,
    },
    {
      id: 8,
      name: "Disease 9",
      img: images.plant2,
    },
    {
      id: 9,
      name: "Disease 10",
      img: images.plant7,
    },
    {
      id: 10,
      name: "Disease 11",
      img: images.plant3,
    },
    {
      id: 11,
      name: "Disease 12",
      img: images.plant2,
    },
    {
      id: 12,
      name: "Disease 13",
      img: images.plant6,
    },
    {
      id: 13,
      name: "Disease 14",
      img: images.plant4,
    },
    {
      id: 14,
      name: "Disease 15",
      img: images.plant1,
    },
    {
      id: 15,
      name: "Disease 16",
      img: images.plant6,
    },
    {
      id: 16,
      name: "Disease 17",
      img: images.plant7,
    },
    {
      id: 17,
      name: "Disease 18",
      img: images.plant3,
    },
    {
      id: 18,
      name: "Disease 19",
      img: images.plant4,
    },
    {
      id: 19,
      name: "Disease 20",
      img: images.plant2,
    },
    {
      id: 20,
      name: "Disease 21",
      img: images.plant5,
    },
    {
      id: 21,
      name: "Disease 22",
      img: images.plant2,
    },
    {
      id: 22,
      name: "Disease 23",
      img: images.plant1,
    }

  ]);

  const [friendList, setFriendList] = useState([
    {
      id: 0,
      img: images.profile1,
    },
    {
      id: 1,
      img: images.profile2,
    },
    {
      id: 2,
      img: images.profile3,
    },
    {
      id: 3,
      img: images.profile4,
    },
    {
      id: 4,
      img: images.profile5,
    },
  ]);

  useEffect(() => {}, []);

  // Render

  function renderNewPlants(item, index) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: SIZES.padding * 0.5,
        }}
      >
        <Image
          source={item.img}
          resizeMode="cover"
          style={{
            width: SIZES.width * 0.20,
            height: "80%",
            borderRadius: 25,
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: "20%",
            right: 0,
            backgroundColor: COLORS.primary,
            paddingHorizontal: SIZES.base,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: COLORS.black, ...FONTS.body4 }}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  }

  function renderFriendsComponent() {
    if (friendList.length == 0) {
      return <View></View>;
    } else if (friendList.length <= 3) {
      return friendList.map((item, index) => (
        <View
          key={`friend-${index}`}
          style={
            index == 0
              ? { flexDirection: "row" }
              : { flexDirection: "row", marginLeft: -20 }
          }
        >
          <Image
            source={item.img}
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 3,
              borderColor: COLORS.primary,
            }}
          />
        </View>
      ));
    } else {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {friendList.map((item, index) => {
            if (index <= 2) {
              return (
                <View
                  key={`friend-${index}`}
                  style={index == 0 ? {} : { marginLeft: -20 }}
                >
                  <Image
                    source={item.img}
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      borderWidth: 3,
                      borderColor: COLORS.primary,
                    }}
                  />
                </View>
              );
            }
          })}

          <Text
            style={{ marginLeft: 5, color: COLORS.secondary, ...FONTS.body3 }}
          >
            +{friendList.length - 3} More
          </Text>
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: SIZES.padding * 0.5,
        }}
      >
        <LottieView
          source={require("../assets/json/welcome.json")}
          autoPlay
          loop={true}
          className="ml-4"
          style={{ width: 50, height: 50 }}
        />
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

      {/* New Plants */}
      <View style={{ height: "25%", backgroundColor: COLORS.white }}>
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            
            <Text style={{ color: COLORS.black, ...FONTS.body2 }}>
              Seasonal Disease
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: COLORS.secondary, ...FONTS.body3, marginRight: 10 }}>
                See All
              </Text>
            <ArrowRightCircleIcon size="30" color={COLORS.black} />
            </View>
          </View>

          <View style={{ marginTop: SIZES.base, marginHorizontal: -SIZES.padding }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={newPlants}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => renderNewPlants(item, index)}
            />
          </View>
        </View>
      </View>

      {/* Today's Share */}
      <View style={{ height: "50%", backgroundColor: COLORS.white }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              marginTop: SIZES.padding,
              marginHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.body2 }}>
                Recent Diagnosis
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("PlantList");
                }}
              >
                <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                height: "88%",
                marginTop: SIZES.base,
              }}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    navigation.navigate("PlantDetail");
                  }}
                >
                  <Image
                    source={images.plant5}
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, marginTop: SIZES.font }}
                  onPress={() => {
                    navigation.navigate("PlantDetail");
                  }}
                >
                  <Image
                    source={images.plant6}
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1.3 }}>
                <TouchableOpacity
                  style={{ flex: 1, marginLeft: SIZES.font }}
                  onPress={() => {
                    navigation.navigate("PlantDetail");
                  }}
                >
                  <Image
                    source={images.plant7}
                    resizeMode="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Add Farmers */}
      <View style={{ height: "30%", backgroundColor: COLORS.white }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              marginTop: SIZES.radius,
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text style={{ color: COLORS.secondary, ...FONTS.h2 }}>
              Added Experts
            </Text>
            <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>
              {friendList.length} total
            </Text>
            <View style={{ flexDirection: "row", height: "60%" }}>
              {/* Friends */}
              <View
                style={{
                  flex: 1.3,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {renderFriendsComponent()}
              </View>

              {/* Add Friend */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>
                  Add New
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: SIZES.base,
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.gray,
                  }}
                  onPress={() => {
                    console.log("Add friend on pressed");
                  }}
                >
                  <Image
                    source={icons.plus}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Home;
