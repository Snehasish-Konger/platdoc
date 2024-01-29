import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { images, icons, COLORS, FONTS, SIZES } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const messagesData = [
  // Assuming 'user' or 'expert' keys are used to differentiate between message senders
  { id: '1', sender: 'user', text: 'Hello Dr. Greene! My orchid plant is infected with disease. Can you help?' },
  { id: '2', sender: 'expert', text: 'Hello! Please send a picture of your plant.' },
  { id: '3', sender: 'user', text: 'Here is the picture.' },
  { id: '4', sender: 'expert', text: 'Thank you. I will get back to you soon.' },
  { id: '5', sender: 'user', text: 'Thank you!'}
  // ... other messages
];

const MessageItem = ({ sender, text }) => (
  <View style={[styles.messageItem, sender === 'expert' ? styles.expertMessage : styles.userMessage]}>
    <Text style={styles.messageText}>{text}</Text>
  </View>
);

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageItem {...item} />}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type message..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={() => {}}>
          <Image source={icons.send} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  messagesList: {
    marginBottom: SIZES.padding,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    marginRight: SIZES.margin,
  },
  messageItem: {
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.margin,
  },
  expertMessage: {
    backgroundColor: COLORS.lightGray,
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  messageText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: COLORS.primary,
  },
});

export default ChatScreen;
