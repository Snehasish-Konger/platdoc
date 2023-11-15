import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  StatusBar,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { auth, database } from "../../config/firebaseConfig";
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const Profile = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const docRef = doc(database, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name || '');
          setAddress(userData.address || '');
          setPhone(userData.phone || '');
          setProfileImage(userData.profileImageUrl || null); // Assuming the field is named 'profileImageUrl'
        } else {
          console.log("No user document found!");
        }
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
      setLoading(false);
    };
  
    fetchUserDetails();
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
        backgroundColor: COLORS.lightGreen,
        height: 44,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? COLORS.black : COLORS.secondary }]}>
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

  const renderScene = SceneMap({
    first: () => (
      <View style={{ flex: 1}}>
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
      <View style={{ flex: 1}}>
        <FlatList
          numColumns={3}
          data={friendList}
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
  });

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: COLORS.white,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ width: "100%" }}>
        <Image
          source={images.cover}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            marginTop: 48,
            marginLeft: 12,
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={45}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>

          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
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
          ) : (
            // Fallback image if no profile image is available
            <Image
              source={images.profile} // Default or placeholder image
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
          )}
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              marginVertical: 8,
            }}
          >
            Welcome {name}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.body4,
            }}
          >
            Phone Number: {phone? phone : "No phone number available"}
          </Text>

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
            {address? address : "No address available"}
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
            onPress={() => navigation.navigate("EditProfile")}
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
