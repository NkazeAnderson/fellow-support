import * as ImagePicker from 'expo-image-picker';

export type PickImageOptions = {
    useCamera: boolean;
    includeBase64?:boolean
    allowMultiple?:boolean
};

export async function pickImage({ useCamera, includeBase64, allowMultiple=true }: PickImageOptions): Promise<ImagePicker.ImagePickerAsset[] | null> {
    let result: ImagePicker.ImagePickerResult;

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
            allowsMultipleSelection:allowMultiple
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
            allowsMultipleSelection:allowMultiple
        });
    }

    if (result.canceled || !result.assets || result.assets.length === 0) {
        return null;
    }

    return result.assets;
}