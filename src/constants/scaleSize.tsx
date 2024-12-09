import { Dimensions } from "react-native";

const figmaWidth: number = 428
const figmaHeight: number = 926

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const screenHeight = Dimensions.get('screen').height;

export function getScaleSize(size: number): number {
    const { width, height } = Dimensions.get('window');
    const scaleWidth = width / figmaWidth;
    const scaleHeight = height / figmaHeight
    const scale = Math.min(scaleWidth, scaleHeight);
    const fontsize = Math.ceil((size * scale))
    return fontsize
}