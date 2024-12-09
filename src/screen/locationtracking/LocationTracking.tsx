import React, { useEffect, useState } from "react";
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../component/Header";
import { STRINGS } from "../../constants/strings";
import MapView, { Callout } from 'react-native-maps'
import GetLocation from "react-native-get-location";
import Geolocation from 'react-native-geolocation-service';
import { Marker } from "react-native-maps";
import Text from "../../component/Text";
import { getScaleSize } from "../../constants/scaleSize";
import { COLORS, IMAGES } from "../../assets";
import SelectDropdown from 'react-native-select-dropdown'

const LocationTracking = (props: any) => {
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {

        if(Platform.OS == 'ios'){
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

    const emojisWithIcons = [
        { title: 'happy' },
        { title: 'cool' },
        { title: 'lol' },
        { title: 'sad' },
        { title: 'cry' },
        { title: 'angry' },
        { title: 'confused' },
        { title: 'excited' },
        { title: 'kiss' },
        { title: 'devil' },
        { title: 'dead' },
        { title: 'wink' },
        { title: 'sick' },
        { title: 'frown' },
    ];

    return (
        <View style={styles.container}>
            <Header title={STRINGS.location_tracking} navigation={props} />
            <View style={{ flex: 1 }}>
                <SelectDropdown
                    data={emojisWithIcons}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem.title) || 'Select employee'}
                                </Text>
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
                <MapView
                    style={{ flex: 1 }}
                    region={{ latitude: 21.236442, longitude: 72.807919, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                    showsUserLocation={true}>
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Platform.OS == 'ios' ? getScaleSize(120) : getScaleSize(86),
        paddingTop: Platform.OS == 'ios' ? getScaleSize(66) : getScaleSize(16),
    },
    dropdownButtonStyle: {
        height: getScaleSize(50),
        backgroundColor: COLORS._E9ECEF,
        borderRadius: getScaleSize(12),
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: getScaleSize(8),
        marginHorizontal: getScaleSize(16),
        borderWidth: getScaleSize(1),
        alignItems: 'center',
        paddingHorizontal: getScaleSize(12),
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: getScaleSize(18),
        fontWeight: '500',
        color: COLORS._151E26,
    },
    dropdownMenuStyle: {
        backgroundColor: COLORS._E9ECEF,
        borderRadius: getScaleSize(8),
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: getScaleSize(12),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: getScaleSize(8),
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: getScaleSize(18),
        fontWeight: '500',
        color: COLORS._151E26,
    },
});

export default LocationTracking;