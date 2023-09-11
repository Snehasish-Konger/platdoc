import * as ImagePicker from "expo-image-picker";

export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
    }
export async function askForPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
    }

export async function pickImageFromGallery() {
    let result = ImagePicker.launchImageLibraryAsync();
    return result;
    }
export async function askForPermissionGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status;
    }
