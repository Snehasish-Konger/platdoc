import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants";
import Geolocation from "react-native-geolocation-service";
import axios from "axios";

const WeatherSection = () => {
  const [weather, setWeather] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted) {
        setPermissionGranted(true);
        getCurrentWeather();
      }
    } else {
      // iOS permission check logic here
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This app needs to access your location for weather updates",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
          buttonNeutral: "Ask Me Later",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionGranted(true);
        getCurrentWeather();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentWeather = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeather = (latitude, longitude) => {
    const API_KEY = "f4ad7b090b4443beb92151136231009"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Assuming weather data includes a date and temperature
  const temperature = weather?.main?.temp;
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" }); // Placeholder for actual day from weather data
  const cityName = weather?.name;

  return (
    <View style={styles.weatherContainer}>
      <Text style={{ ...FONTS.body2 }}>Weather</Text>
      <View style={styles.weatherCard}>
        <Text style={{ ...FONTS.body3 }}>{cityName}</Text>
        <Text style={{ ...FONTS.body3 }}>{day}</Text>
        <Text style={{ ...FONTS.body3 }}>{temperature}°C</Text>
        {/* Display weather information or permission request based on state */}
        <Image
          style={styles.weatherIcon}
          source={require("../assets/images/sun.png")} // Replace with your local image path
        />
        {permissionGranted ? (
          <Image
            style={styles.weatherIcon}
            source={require("../assets/images/sun.png")} // Replace with your local image path
          />
        ) : (
          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
              Location permission required
            </Text>
            <TouchableOpacity
              style={styles.permissionButton}
              onPress={requestLocationPermission}
            >
              <Text style={styles.permissionButtonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  weatherCard: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#FFF",
    elevation: 2, // Shadow for Android
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  weatherDate: {
    fontSize: 16,
    color: "#333",
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  weatherInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  permissionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFD580",
    borderRadius: 10,
    marginTop: 15,
  },
  permissionText: {
    fontSize: 16,
    color: "#333",
  },
  permissionButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 10,
  },
  permissionButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  weatherIcon: {
    position: "absolute", // Position it over the card
    top: 20,
    right: 20,
    width: 50,
    height: 50,
  },
});

export default WeatherSection;
