// app/HomeScreen.js
import React from "react";
import {
    View,
    ScrollView,
    Image,
    StyleSheet
} from "react-native";
import { getScaleSize } from "../../../constants/scaleSize";
import { COLORS, IMAGES } from "../../../assets";
import { SCREENS } from "../..";
import { STRINGS } from "../../../constants/strings";
import Button from "../../../component/Button";


const EmployeeComp = (props: any) => {

    const { navigation } = props


    return (

        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.buttonContainer}>
                <Button
                    title={(STRINGS.attendance)}
                    onPress={() => {
                        navigation.navigation.navigate(SCREENS.AttendanceScreen.identifier)
                    }}
                />
                <Button
                    title={(STRINGS.update_task)}
                    onPress={() => {
                        navigation.navigation.navigate(SCREENS.EmployeeAssignTasks.identifier)
                    }}
                />
                <Button
                    title={(STRINGS.chat)}
                    onPress={() => {
                        navigation.navigation.navigate(SCREENS.ChatScreen.identifier)
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonContainer: {
        width: "80%",
        alignItems: "center",
        marginTop: getScaleSize(30),
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

export default EmployeeComp;
