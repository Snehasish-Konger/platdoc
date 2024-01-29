import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  BellIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  StarIcon,
  CalendarIcon,
  ArrowLeftCircleIcon,
} from "react-native-heroicons/outline";
import { FONTS, SIZES } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationItem = ({ icon, title, message, time, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{ flexDirection: "row", padding: 16, alignItems: "center" }}
  >
    <View style={{ marginRight: 16 }}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
      <Text style={{ fontSize: 14, color: "gray", marginVertical: 4 }}>
        {message}
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>{time}</Text>
    </View>
    <View style={{ marginLeft: "auto" }}>
      <InformationCircleIcon color="gray" />
    </View>
  </TouchableOpacity>
);

const Notification = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: SIZES.padding * 0.5,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: SIZES.padding * 0.5 }}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftCircleIcon color="black" size={30} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <BellIcon color="black" size={30} />
          <Text style={{ ...FONTS.h2 }}>Notifications</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView className="mt-10">
        <NotificationItem
          icon={<CheckCircleIcon color="green" />}
          title="Account Security Alert"
          message="We've noticed some unusual activity on your account. Please review your recent logins and update your password if necessary."
          time="09:41 AM"
          onPress={() => {}}
        />
        <NotificationItem
          icon={<InformationCircleIcon color="blue" />}
          title="System Update Available"
          message="A new system update is ready for installation. It includes performance improvements and bug fixes."
          time="08:46 AM"
          onPress={() => {}}
        />
        {/* Divider */}
        <View
          style={{ height: 1, backgroundColor: "lightgray", marginVertical: 8 }}
        ></View>
        <Text style={{ fontSize: 16, color: "gray", paddingHorizontal: 16 }}>
          Yesterday
        </Text>
        {/* More notifications */}
        <NotificationItem
          icon={<CheckCircleIcon color="green" />}
          title="Password Reset Successful"
          message="Your password has been successfully reset. If you didn't request this change, please contact support immediately."
          time="20:30 PM"
          onPress={() => {}}
        />
        <NotificationItem
          icon={<StarIcon color="yellow" />}
          title="Exciting New Feature"
          message="We've just launched a new feature that will enhance your user experience. Check it out now!"
          time="16:29 PM"
          onPress={() => {}}
        />
        <NotificationItem
          icon={<CalendarIcon color="red" />}
          title="Event Reminder"
          message="Don't forget about the special event tomorrow at 3 PM. We can't wait to see you there!"
          time="10:54 AM"
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
