// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import Constants from "expo-constants";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDvw9O1spGoOpOxeg4hDpFz3mduDTv-rXM",
//   authDomain: "plantdoc-7a537.firebaseapp.com",
//   projectId: "plantdoc-7a537",
//   storageBucket: "plantdoc-7a537.appspot.com",
//   messagingSenderId: "273717150272",
//   appId: "1:273717150272:web:caaf585668ba8ae65215a5",
//   measurementId: "G-14Y3KC8YK5"
// };

initializeApp(firebaseConfig);
export const auth = initializeAuth( initializeApp(firebaseConfig),
  { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
export const database = getFirestore();