// EditProfile.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES, images } from "../../constants";
import { auth, database, storage } from "../../config/firebaseConfig"; // Adjust path according to your project structure
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // Assuming Expo Image Picker is used

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user details
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
        }
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Update based on the new API
      const selectedImage = result.assets[0].uri; // Access the uri from the assets array
      setProfileImage(selectedImage);
    }
  };

  const uploadImage = async () => {
    if (profileImage) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_images/${auth.currentUser.uid}`);
      const uploadTask = await uploadBytes(storageRef, blob);
      return getDownloadURL(uploadTask.ref);
    }
    return null;
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage();
      const docRef = doc(database, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        name,
        address,
        phone,
        profileImageUrl: imageUrl, // Save the URL of the profile image in Firestore
      });
      alert("Profile updated successfully");
    } catch (error) {
      alert("Error updating profile:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="flex mb-10">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
            //   marginTop: 48,
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
        <View className="flex-row justify-center">
          <Text className="text-xl font-bold mb-2 text-center"> Edit Profile </Text>
        </View>
      </View>
      <TouchableOpacity onPress={pickImage} className="mb-4">
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 200, height: 200, alignSelf: "center" }}
            className="rounded-full"
          />
        ) : (
          <Image
            source={images.profile}
            style={{ width: 200, height: 200, alignSelf: "center" }}
            className="rounded-full"
          />
        )}
        <Text className="text-center text-blue-500">Pick an Image</Text>
      </TouchableOpacity>
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        className="border border-gray-300 p-2 mb-4"
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded"
        onPress={handleUpdateProfile}
      >
        <Text className="text-white text-center font-bold">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;
