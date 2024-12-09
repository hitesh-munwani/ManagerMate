import React, { useEffect, useState } from "react";
import {
    Image,
    Platform,
    StyleSheet,
    View,
} from "react-native";
import Header from "../../component/Header";
import { STRINGS } from "../../constants/strings";
import MapView, { Callout } from 'react-native-maps'
import GetLocation from "react-native-get-location";
import Geolocation from 'react-native-geolocation-service';
import { Marker } from "react-native-maps";
import { getScaleSize } from "../../constants/scaleSize";
import { IMAGES } from "../../assets";
import SuccessModal from "../../modal/SuccessModal";
import Button from "../../component/Button";

const AttendanceLocationTracking = (props: any) => {
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [addMarker, setAddMarker] = useState(false);
    const [addLatitude, setAddlatitude] = useState(0);
    const [addlLongitude, setAddlongitude] = useState(0);
    const [showAttendanceModel, setShowAttendanceModel] = useState<boolean>(false);

    useEffect(() => {

        if (Platform.OS == 'ios') {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    setlatitude(21.236442)
                    setlongitude(72.807919)
                    console.log("latitude::>>" + location.latitude)
                    console.log("longitude::>>" + location.longitude)
                    Geolocation.getCurrentPosition(
                        (position) => {
                            // setlatitude(position.coords.latitude)
                            // setlongitude(position.coords.longitude)
                            setlatitude(21.236442)
                            setlongitude(72.807919)

                        },
                        (error) => {
                            // See error code charts below.
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                    // checkLocationPermission()
                })
                .catch(error => {
                    const { code, message } = error;
                    setErrorMsg(message)
                    Geolocation.getCurrentPosition(
                        (position) => {
                            // setlatitude(position.coords.latitude)
                            // setlongitude(position.coords.longitude)
                            setlatitude(21.236442)
                            setlongitude(72.807919)

                        },
                        (error) => {
                            // See error code charts below.
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                    // console.warn(code, message);
                })
        }


    }, []);


    return (
        <View style={styles.container}>
            <Header title={STRINGS.attendance} navigation={props} />
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1, marginTop: getScaleSize(16) }}
                    region={{ latitude: 21.236442, longitude: 72.807919, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                    showsUserLocation={true}
                    onPress={(marker) => {
                        if (undefined != marker.nativeEvent.coordinate) {
                            setAddlatitude(marker.nativeEvent.coordinate.latitude)
                            setAddlongitude(marker.nativeEvent.coordinate.longitude)
                            setAddMarker(true)
                        }
                    }
                    }>

                    {
                        addMarker &&
                        <Marker
                            coordinate={{
                                latitude: addLatitude,
                                longitude: addlLongitude,
                            }}
                            title={'Employee'}
                            description=""
                        >
                            <Image source={IMAGES.location_icon} style={{ height: 40, width: 40 }} />
                        </Marker>
                    }
                </MapView>

            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title={(STRINGS.submit)}
                    onPress={() => {
                        setShowAttendanceModel(true)
                    }}
                />
            </View>

            <SuccessModal
                showAttendanceModel={showAttendanceModel}
                setShowAttendanceModel={setShowAttendanceModel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Platform.OS == 'ios' ? getScaleSize(120) : getScaleSize(86),
        paddingTop: Platform.OS == 'ios' ? getScaleSize(66) : getScaleSize(16),
    },
    buttonContainer: {
        width: "80%",
        alignSelf: 'center'
    },
});

export default AttendanceLocationTracking;