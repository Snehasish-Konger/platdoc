import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Profile = ({navigation}) => {
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

  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {user ? (
        <>
          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
          <Text>Welcome, {user.displayName}</Text>
          <Text>Email: {user.email}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </>
      ) : (
        <Text>You are not logged in</Text>
      )}
    </View>
  );
};

export default Profile;
