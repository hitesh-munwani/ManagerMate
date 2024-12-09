// app/HomeScreen.js
import React, { useState } from "react";
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Platform
} from "react-native";
import { getScaleSize } from "../../constants/scaleSize";
import { COLORS, IMAGES } from "../../assets";
import { SCREENS } from "../";
import { STRINGS } from "../../constants/strings";
import Header from "../../component/Header";
import GetLocation from 'react-native-get-location'
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import Button from "../../component/Button";

const AttendanceScreen = (props: any) => {


    const [latitude, setlatitude] = useState()
    const [longitude, setlongitude] = useState()

    // useEffect(()=>{
    //     handleEnabledPressed()
    // },[])
    async function handleEnabledPressed() {
        if (Platform.OS === 'android') {
            try {
                const enableResult = await promptForEnableLocationIfNeeded();
                getLocationData()

            } catch (error) {
                if (error instanceof Error) {
                    // console.error(error.message);
                }
            }
        } else {
            getLocationData()
        }
    }

    function getLocationData() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })
            .then((location: any) => {
                setlatitude(location?.latitude)
                setlongitude(location?.longitude)
                // setShowAttendanceModel(true)

            })
            .catch(error => {
                // SHOW_TOAST("Please go in setting menu allow the location permission")
                const { code, message } = error;
                // console.warn(code, message);
            })
    }

    return (
        <View style={styles.viewContainer}>
            <Header title={STRINGS.attendance} navigation={props} />

            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.buttonContainer}>
                    <Button
                        title={(STRINGS.mark_attendance)}
                        onPress={() => {
                            props.navigation.navigate(SCREENS.AttendanceLocationTracking.identifier)
                        }}
                    />
                    <Button
                        title={(STRINGS.generate_reports)}
                        onPress={() => {
                        }}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Image
                        style={styles.image}
                        source={IMAGES.btmImg}
                    />
                </View>


            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        height: Platform.OS == 'ios' ? getScaleSize(120) : getScaleSize(86),
        paddingTop: Platform.OS == 'ios' ? getScaleSize(66) : getScaleSize(16),
        backgroundColor: '#fff'
    },
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonContainer: {
        alignItems: "center",
        width: '80%',
        marginTop: getScaleSize(30),
    },
    button: {
        backgroundColor: COLORS._1E90FF,
        padding: getScaleSize(15),
        borderRadius: getScaleSize(20),
        alignItems: "center",
        marginBottom: getScaleSize(20),
    },
    buttonText: {
        color: COLORS.white,
        fontSize: getScaleSize(18),
    },
    bottomContainer: {
        width: "100%",
        marginTop: getScaleSize(30),
    },
    image: {
        width: "100%",
        height: getScaleSize(200), // Adjust height as needed
    },

});

export default AttendanceScreen;
