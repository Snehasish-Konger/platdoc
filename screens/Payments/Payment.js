import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { BanknotesIcon } from 'react-native-heroicons/outline';

const Payment = () => {
  const [selectedType, setSelectedType] = useState('card');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('01');
  const [expiryYear, setExpiryYear] = useState('2020');
  const [securityCode, setSecurityCode] = useState('');

  return (
    <SafeAreaView className="min-h-full bg-gray-200 flex justify-center items-center p-5">
      <View className="bg-white rounded-lg shadow-lg p-5 text-gray-700 max-w-md w-full">
        <View className="text-center pt-1 pb-5">
          <View className="bg-indigo-500 text-white rounded-full w-20 h-20 mx-auto shadow-lg flex justify-center items-center -mt-16">
            <BanknotesIcon size={48} color={'white'} />
          </View>
        </View>
        <Text className="text-center font-bold text-xl uppercase mb-10">Secure payment info</Text>
        <View className="flex-row justify-center mb-3">
          <TouchableOpacity onPress={() => setSelectedType('card')} className="px-2">
            <Image source={{ uri: 'https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png' }} style={{ height: 32, width: 32 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedType('paypal')} className="px-2">
            <Image source={{ uri: 'https://www.sketchappsources.com/resources/source-image/PayPalCard.png' }} style={{ height: 32, width: 32 }} />
          </TouchableOpacity>
        </View>
        <View className="mb-3">
          <Text className="font-bold text-sm ml-1">Name on card</Text>
          <TextInput className="border border-gray-200 rounded-md p-2 mb-1" placeholder="John Smith" value={nameOnCard} onChangeText={setNameOnCard} />
        </View>
        <View className="mb-3">
          <Text className="font-bold text-sm ml-1">Card number</Text>
          <TextInput className="border border-gray-200 rounded-md p-2 mb-1" placeholder="0000 0000 0000 0000" value={cardNumber} onChangeText={setCardNumber} />
        </View>
        <View className="flex-row items-end mb-3">
          <View className="flex-1 px-2">
            <Text className="font-bold text-sm ml-1">Expiration date</Text>
            <Picker selectedValue={expiryMonth} onValueChange={(itemValue, itemIndex) => setExpiryMonth(itemValue)} className="border border-gray-200 rounded-md p-2 mb-1">
              {/* Picker.Item elements here for months */}
            </Picker>
          </View>
          <View className="flex-1 px-2">
            <Picker selectedValue={expiryYear} onValueChange={(itemValue, itemIndex) => setExpiryYear(itemValue)} className="border border-gray-200 rounded-md p-2 mb-1">
              {/* Picker.Item elements here for years */}
            </Picker>
          </View>
        </View>
        <View className="mb-10">
          <Text className="font-bold text-sm ml-1">Security code</Text>
          <TextInput className="border border-gray-200 rounded-md p-2 mb-1 w-32" placeholder="000" value={securityCode} onChangeText={setSecurityCode} />
        </View>
        <TouchableOpacity className="bg-indigo-500 rounded-lg p-3">
          <Text className="text-white text-center font-semibold">PAY NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
