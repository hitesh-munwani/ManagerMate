import React from "react";
import { StyleSheet, TouchableOpacity } from 'react-native'

//CONSTANTS & ASSETS
import { COLORS } from "../assets";

//COMPONENTS
import { getScaleSize } from "../constants/scaleSize";
import Text from "./Text";

const Button = (props: any) => {

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, props.style]}
            onPress={props.onPress}>
            <Text
                align='center'
                size={getScaleSize(20)}
                color={COLORS.white}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        backgroundColor: COLORS._1E90FF,
        padding: getScaleSize(15),
        borderRadius: getScaleSize(20),
        alignItems: "center",
        marginBottom: getScaleSize(20),
    },

})

export default Button;