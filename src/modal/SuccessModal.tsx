// app/HomeScreen.js
import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Modal
} from "react-native";
import { COLORS, IMAGES } from "../assets";
import Text from "../component/Text";
import { getScaleSize } from "../constants/scaleSize";


const SuccessModal = (props: any) => {

    const { showAttendanceModel, setShowAttendanceModel, successText } = props

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={showAttendanceModel}
            onRequestClose={() => {
                setShowAttendanceModel(!showAttendanceModel);
            }}
        >
            <TouchableOpacity style={styles.backgroundstyle}
                onPress={() => { setShowAttendanceModel(!showAttendanceModel); }}>
                <View style={styles.modalContainer}>
                    <Image source={IMAGES.successfull}
                        style={styles.imageStyle} />
                    <Text
                        style={{ marginTop: getScaleSize(24) }}
                        color={COLORS.black}
                        size={getScaleSize(24)}>
                        {'Success'}
                    </Text>
                    <Text
                        style={{ marginTop: getScaleSize(16), textAlign: 'center' }}
                        color={COLORS.black}
                        size={getScaleSize(16)}>
                        {successText}
                    </Text>

                </View>

            </TouchableOpacity>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 200, // Adjust height as needed
    },
    modalContainer: {
        alignItems: 'center',
        marginLeft: getScaleSize(10),
        marginRight: getScaleSize(10),
        padding: getScaleSize(16),
        borderRadius: getScaleSize(8),
        backgroundColor: COLORS.white
    },
    imageStyle: {
        height: getScaleSize(48),
        width: getScaleSize(48),
        resizeMode: 'contain',
        marginTop: getScaleSize(16),
    },
    backgroundstyle: {
        flex: 1.0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }

});

export default SuccessModal;
