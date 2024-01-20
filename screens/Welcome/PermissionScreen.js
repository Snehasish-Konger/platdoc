import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS } from "../../constants";

const { width } = Dimensions.get('window');

const PermissionScreen = ({ navigation }) => {
  const scrollViewRef = useRef();

  const permissions = [
    {
      name: 'Notifications',
      description: 'Allow notifications to stay informed about important updates.',
      image: require("../../assets/images/notifications.png"),
      permissionType: null, // For notifications, we handle this separately
    },
    {
      name: 'Location',
      description: 'Allow access to your precise location for location-based services.',
      image: require("../../assets/images/location.png"),
      permissionType: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    },
    {
      name: 'Camera & Storage',
      description: 'Allow access to your camera and local storage to save and upload photos.',
      image: require("../../assets/images/camera_storage.png"),
      permissionType: PermissionsAndroid.PERMISSIONS.CAMERA,
    },
  ];

  const requestPermission = async (permissionType) => {
    if (permissionType) {
      const granted = await PermissionsAndroid.request(permissionType);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
  };

  const handleAllow = async (index) => {
    const permission = permissions[index];
    const isGranted = await requestPermission(permission.permissionType);
    
    if (isGranted) {
      // Permission granted, move to the next permission
      if (index < permissions.length - 1) {
        scrollViewRef.current?.scrollTo({ x: width * (index + 1), animated: true });
      } else {
        // All permissions have been processed, navigate to the Welcome page
        navigation.navigate('Welcome');
      }
    } else {
      // Permission denied, you may want to explain why you need this permission
    }
  };

  const handleSkip = (index) => {
    // Move to the next permission
    if (index < permissions.length - 1) {
      scrollViewRef.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      // All permissions have been processed, navigate to the Welcome page
      navigation.navigate('Welcome');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGreen }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {permissions.map((permission, index) => (
          <View key={index} style={{ width, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={permission.image} style={{ width: 350, height: 350 }} />
            <Text style={{...FONTS.h1}}>{permission.name}</Text>
            <Text style={{...FONTS.body3, marginHorizontal:20, textAlign: 'center',}}>{permission.description}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => handleSkip(index)}
                style={styles.skipButton}
              >
                <Text style={{...FONTS.body2}} className='text-gray-900 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 '>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAllow(index)}
                style={styles.allowButton}
              >
                <Text style={{...FONTS.body2}} className='text-white bg-green-700  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2'>Allow</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (other styles remain unchanged)
  buttonContainer: {
    position: 'absolute', // Use absolute to position the buttons over the ScrollView
    bottom: 20, // Distance from the bottom of the screen
    left: 0, // Align to the left side
    right: 0, // Align to the right side
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Padding on the sides
  },
  // ... (other styles remain unchanged)
});

export default PermissionScreen;
