import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { auth, firestore } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Profile = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add Firebase authentication state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  // Function to sign out the user
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const [routes] = useState([
    { key: "first", title: "Photos" },
    { key: "second", title: "Connections" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
      }}
      style={{
        backgroundColor: COLORS.white,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? COLORS.black : COLORS.gray }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const [newPlants, setNewPlants] = useState([
    {
      id: 0,
      name: "Net Blitch",
      img: images.plant1,
      favourite: false,
    },
    {
      id: 1,
      name: "Stripe rust",
      img: images.plant2,
      favourite: true,
    },
    {
      id: 2,
      name: "Leaf Spot",
      img: images.plant3,
      favourite: false,
    },
    {
      id: 3,
      name: "Disease 4",
      img: images.plant4,
      favourite: false,
    },
    {
      id: 4,
      name: "Disease 5",
      img: images.plant5,
      favourite: false,
    },
    {
      id: 5,
      name: "Disease 6",
      img: images.plant6,
      favourite: true,
    },
  ]);

  const renderScene = SceneMap({
    first: () => (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <FlatList
          numColumns={3}
          data={newPlants}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1 / 3,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
                margin: 8,
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            </View>
          )}
        />
      </View>
    ),
    second: () => (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <FlatList
          numColumns={3}
          data={images.profile}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1 / 3,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item.url}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            </View>
          )}
        />
      </View>
    ),
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.white} />

      <View style={{ width: "100%" }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        {user && (
          <>
            <Image
              source={images.profile}
              resizeMode="contain"
              style={{
                height: 155,
                width: 155,
                borderRadius: 999,
                borderColor: COLORS.primary,
                borderWidth: 2,
                marginTop: -90,
              }}
            />
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                marginVertical: 8,
              }}
            >
              Welcome {user.displayName}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.body4,
              }}
            >
              {user.email}
            </Text>
          </>
        )}

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            Newtown, Kolkata, West Bengal, India
            {/* {user.address} */}
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              122
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Image Uploads
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              67
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Solved
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              55
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Unsolved
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
            onPress={signOut} // Call signOut when pressed
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

export default Profile;
