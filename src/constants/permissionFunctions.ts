import { Alert, Linking, Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions';
import { IMAGES } from "../assets";

export const requestMicroPhonePermission = async () => {

    try {
        if (Platform.OS == 'ios') {
            const isGranted = await request(PERMISSIONS.IOS.MICROPHONE);

            if (isGranted === RESULTS.GRANTED) return true;
            return false;

        } else {
            //@ts-ignore
            const permissions = Platform.constants.Version >= 33 ? [PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

            const isGranted = await requestMultiple([
                PERMISSIONS.ANDROID.RECORD_AUDIO,
                ...permissions
            ])
            //@ts-ignore
            const isPermissionGranted = Platform.constants.Version >= 33 ? ((isGranted["android.permission.RECORD_AUDIO"] === RESULTS.GRANTED) && (isGranted["android.permission.READ_MEDIA_AUDIO"] === RESULTS.GRANTED)) : ((isGranted["android.permission.WRITE_EXTERNAL_STORAGE"] === RESULTS.GRANTED) && (isGranted["android.permission.READ_EXTERNAL_STORAGE"] === RESULTS.GRANTED) && (isGranted["android.permission.RECORD_AUDIO"] === RESULTS.GRANTED));

            return isPermissionGranted;

        }
    }
    catch (e) {
        console.log(e);

    }
}

export const requestCameraPermission = async () => {

    const permission = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA
    })
    //@ts-ignore
    const isGranted = await request(permission);

    if (isGranted === 'granted') return true;
    return false;
}

export const requestStoragePermission = async () => {

    const permission = Platform.select({
        ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
        android: [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
    })
    //@ts-ignore
    const isGranted = await requestMultiple(permission);
    //@ts-ignore
    if (isGranted === 'granted') return true;
    return false;
}

export const getUserImages = [{ name: 'Camera', source: IMAGES.camera }, { name: '', source: 0 }, { name: 'Gallery', source: IMAGES.new_galary }]
