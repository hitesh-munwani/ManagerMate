import React from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

//CONSTANT
import { getScaleSize } from '../constants/scaleSize';

//CONSTANT & ASSETS
import { COLORS } from "../assets";

interface TextProps {
    style?: StyleProp<TextStyle> | undefined,
    font?: string | undefined
    color?: string | undefined,
    align?: string | undefined,
    size?: number | undefined,
    children: any | undefined
    numberOfLines?: number
    onpress?: any | undefined
}

function Text(props: TextProps) {

    const fontFamily: string | undefined = props.font ? props.font : undefined
    const fontSize: number = props.size ? props.size : 13
    const fontColor: string = props?.color ?? COLORS.black
    return (
        <RNText
            {...props}
            style={[
                props.style,
                {
                    color: fontColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily
                },
            ]}
            onPress={props?.onpress}>
            {props.children}
        </RNText>
    )
}


Text.defaultValue = {
    style: {},
    size: getScaleSize(12),
    color: COLORS.white,
};

export default Text;
