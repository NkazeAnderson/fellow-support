import * as ImagePicker from 'expo-image-picker';

type PickImageOptions = {
    useCamera: boolean;
    includeBase64?:boolean
};

export async function pickImage({ useCamera, includeBase64 }: PickImageOptions): Promise<ImagePicker.ImagePickerAsset | null> {
    let result: ImagePicker.ImagePickerResult;

    console.log({includeBase64});
    

    if (useCamera) {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            return null;
        }
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: "images",
            cameraType: ImagePicker.CameraType.back,
            allowsEditing: false,
            base64:includeBase64,
            quality: 1,
        });
    } else {
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return null;
        }
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: false,
            quality: 1,
        });
    }

    if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
    }

    return result.assets[0];
}