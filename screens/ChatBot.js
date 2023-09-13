import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FONTS } from "../constants";
import { PaperAirplaneIcon, TrashIcon, CameraIcon } from "react-native-heroicons/outline";
import { pickImageFromGallery } from "../utils/imgpick";

const PALM_API_KEY = "AIzaSyAwkJI6LlP0sb3P0-BxVPwMoB4qg2aLR4s"; // Replace with your API Key

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleImage = async () => {
    let result = await pickImageFromGallery();
    if (!result.canceled) {
      setInputText(result.uri);
    }
  };

  const generateText = async () => {
    if (inputText.trim() === "") {
      return;
    }
    setLoading(true);
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage`;

    const requestData = {
      prompt: {
        context:
          "You are a plant doctor with more than 20 years of experience. You've complete knowledge of all type of plants and thir disease and their cure. So, you are the best person to ask about any plant related query.",
        examples: [],
        messages: [{ content: inputText }],
      },
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `${apiUrl}?key=${PALM_API_KEY}`,
        requestData,
        {
          headers,
        }
      );

      if (response.status === 200) {
        if (
          response.data &&
          response.data.candidates &&
          response.data.candidates.length > 0
        ) {
          const botResponse = response.data.candidates[0].content;

          // Add the user's input to the messages array
          const newUserMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: "user", // Set the sender as 'user'
            timestamp: new Date().getTime(),
          };

          // Add the bot's response to the messages array
          const newBotMessage = {
            id: messages.length + 2,
            content: botResponse,
            sender: "bot", // Set the sender as 'bot'
            timestamp: new Date().getTime(),
          };

          setMessages([...messages, newUserMessage, newBotMessage]);
          setInputText("");
          setLoading(false);
        } else {
          ToastAndroid.show("Response structure is not as expected.");
          setLoading(false);
        }
      } else {
        ToastAndroid.show(
          "Google Cloud API request failed with status:",
          response.status
        );
        setLoading(false);
      }
    } catch (error) {
      ToastAndroid.show(
        "An error occurred while making the Google Cloud API request:",
        error
      );
      setLoading(false);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      className=" flex-1 relative"
      style={{ top: 50 }}
    >
      <Text
        className="text-gray-700 font-semibold ml-1 m-6 text-center"
        style={{ fontSize: wp(5), ...FONTS.body1 }}
      >
        PlantDoc Assistant
      </Text>
      {/* Clear History */}
      <View className="flex-row items-center justify-end m-4">
        <Pressable
          title="Clear"
          onPress={() => {
            setMessages([]);
          }}
          className="m-4"
        >
          <TrashIcon size="25" color="red" />
        </Pressable>

      </View>
      {/* Input Text */}
      <View className="flex-row items-center justify-center m-4 bg-white rounded-full align-middle">
        {/* Upload Image */}
        <Pressable
          title="Upload"
          onPress={() => {
            handleImage();
          }
          }
          className="m-4"
        >
          <CameraIcon size="25" color="black" />
        </Pressable>
        <TextInput
          style={{
            ...FONTS.body3,
          }}
          className="bg-white rounded-full py-2.5 px-6 mr-2 ml-2 flex-1 text-gray-700 "
          placeholder="Ask to the AI Doctor..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <Pressable title="Ask" onPress={generateText} className="m-4">
          {isLoading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <PaperAirplaneIcon size="25" color="black" />
          )}
        </Pressable>
      </View>

      {/* Result Window */}
      <ScrollView
        style={{ height: hp(100), width: wp(100) }}
        ref={scrollViewRef}
        bounces={false}
        className="space-y-4 m-6 flex-row"
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => {
          if (message.role === "assistant") {
            if (message.content.includes("https")) {
              // AI image response
              return (
                <View key={index} className="flex-1 justify-start">
                  <View className="p-2 rounded-2xl bg-emerald-100 rounded-tl-none">
                    <Image
                      source={{ uri: message.content }}
                      className="rounded-2xl"
                      resizeMode="contain"
                      style={{ height: wp(60), width: wp(60) }}
                    />
                  </View>
                </View>
              );
            } else {
              //  PaLM text response
              return (
                <View
                  key={index}
                  style={{ width: wp(70) }}
                  className="bg-emerald-100 p-2 rounded-xl rounded-tl-none justify-start"
                >
                  <Text className="text-neutral-800" style={{ ...FONTS.body3 }}>
                    {message.content}
                  </Text>
                </View>
              );
            }
          } else {
            // User input text
            return (
              <View key={index} className="justify-end">
                <View
                  style={{ width: wp(70) }}
                  className="bg-white p-4 rounded-xl rounded-tr-none"
                >
                  <Text style={{ ...FONTS.body4 }} className="text-gray-700">
                    {message.content}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default Chatbot;
