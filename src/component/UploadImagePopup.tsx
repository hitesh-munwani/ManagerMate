import React, { useContext } from "react"
import { Image, Platform, StyleSheet, TouchableOpacity, View, PermissionsAndroid, Linking, Alert } from "react-native"

//COMPONENTS
import Text from "./Text"


//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { COLORS } from "../assets"
import { getScaleSize } from "../constants/scaleSize";
import { requestMicroPhonePermission } from "../constants/permissionFunctions";

function UploadImagePopup(props: any) {


    const data = props.data


    async function requestCameraPermission(e: any, index: number) {
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'App Camera Permission',
                        message: 'App needs access to your camera ',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    props.onPress(e, index)
                } else {
                }
            } catch (err) {
            }
        }
        else {
            const isGranted = await requestPermissionForCamera();

            if (isGranted) {
                props.onPress(e, index)
            } else {
                displayCameraPermissionAlert()
            }
            //
        }
    }

    const requestPermissionForCamera = async () => {

        try {
            const isGranted = await request(PERMISSIONS.IOS.CAMERA);

            if (isGranted === RESULTS.GRANTED) return true;
            return false;
        }
        catch (e) {
        }
    }

    const displayCameraPermissionAlert = () => {
        async function onClickAllow() {
            const isGranted = await requestMicroPhonePermission();

            if (!isGranted) {
                await Linking.openSettings()
            }
        }

        Alert.alert(
            'Camera permission',
            'Permission needs to be granted for this capture photos',
            [
                {
                    onPress: () => onClickAllow(),
                    text: 'Allow permission',
                    style: 'default'
                },
                {
                    onPress: () => null,
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
            <RBSheet ref={props.onRef}
                closeOnDragDown={true}
                closeOnPressMask={true}
                animationType='slide'
                customStyles={{
                    container: {
                        backgroundColor: '#FFF',
                        height: Platform.OS == 'ios' ? getScaleSize(230) : getScaleSize(200),
                        borderTopLeftRadius: getScaleSize(20),
                        borderTopRightRadius: getScaleSize(20),
                    },
                }}>
                <View style={styles.direction}>
                    {data.map((e: any, index: number) => {
                        return (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (index == 0) {
                                            requestCameraPermission(e, index)
                                        }
                                        else {
                                            props.onPress(e, index)
                                        }
                                        // 
                                    }}
                                    key={e + index}>
                                    <Image style={styles.image}
                                        resizeMode="contain"
                                        source={e.source} />
                                    <Text
                                        style={styles.text}
                                        size={getScaleSize(18)}
                                        align='center'
                                        color={COLORS.black}>
                                        {e?.name}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ width: getScaleSize(30) }}></View>
                            </>
                        )
                    })}
                </View>
            </RBSheet>
        </View>
    )

}

const styles = StyleSheet.create({
    direction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: getScaleSize(44),
        marginLeft: getScaleSize(30),
    },
    image: {
        height: getScaleSize(56),
        width: getScaleSize(56),
        alignSelf: 'center'
    },
    text: {
        marginTop: getScaleSize(8)
    }
})

export default UploadImagePopup