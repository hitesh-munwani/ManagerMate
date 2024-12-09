import React from "react";
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native'

//CONSTANT & ASSETS
import { getScaleSize } from "../constants/scaleSize";
import { COLORS, IMAGES } from "../assets";

//COMPONENTS
import Text from "./Text";


function Header(props: any) {
    const { title, navigation } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigation.goBack() }}>
                <Image
                    source={IMAGES.backArrow}
                    style={styles.backArrow} />
            </TouchableOpacity>
            <Text
                style={{ marginLeft: getScaleSize(16) }}
                color={COLORS.black}
                size={getScaleSize(20)}>
                {title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backArrow: {
        height: getScaleSize(20),
        width: getScaleSize(20),
        marginLeft: getScaleSize(16),
        resizeMode: 'contain',
    },
})

export default Header