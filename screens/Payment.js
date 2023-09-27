// Payment.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Payment = () => {
  const handlePayment = () => {
    // Handle payment logic here
    alert('Payment processed successfully');
  };

  return (
    <View className ='flex-1 justify-center items-center'>
      <Text className ='text-2xl font-bold mb-4'>Payment Page</Text>
      
      {/* Payment options */}
      <TouchableOpacity
        className ='bg-blue-500 p-4 rounded-md mb-2'
        onPress={handlePayment}
      >
        <Text className ='text-white font-bold text-center'>
          Pay with UPI
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className ='bg-green-500 p-4 rounded-md mb-2'
        onPress={handlePayment}
      >
        <Text className ='text-white font-bold text-center'>
          Pay with Credit Card
        </Text>
      </TouchableOpacity>

      {/* Add more payment options as needed */}

      {/* Cancel button */}
      <TouchableOpacity
        className ='bg-red-500 p-4 rounded-md'
        onPress={() => alert('Payment canceled')}
      >
        <Text className ='text-white font-bold text-center'>
          Cancel Payment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
