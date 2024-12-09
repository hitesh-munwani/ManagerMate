// app/HomeScreen.js
import React from "react";
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
} from "react-native";
import { getScaleSize } from "../../../constants/scaleSize";
import { COLORS, IMAGES } from "../../../assets";
import { SCREENS } from "../..";
import { STRINGS } from "../../../constants/strings";
import Button from "../../../component/Button";


const ManagerComp = (props: any) => {
    const { navigation } = props

    return (

        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.buttonContainer}>
                <Button
                    title={(STRINGS.location_tracking)}
                    onPress={() => {
                        navigation.navigation.navigate(SCREENS.LocationTracking.identifier)
                    }}
                />
                <Button
                    title={(STRINGS.assign_tasks)}
                    onPress={() => {
                        navigation.navigation.navigate(SCREENS.AssignTasks.identifier)
                    }}
                />
                <Button
                    title={(STRINGS.generate_reports)}
                    onPress={() => {
                        navigation.navigation.navigate(SCREENS.EmployeeScreen.identifier)
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
    topContainer: {
        backgroundColor: COLORS.white,
        marginTop: getScaleSize(56),
    },
    logo: {
        width: getScaleSize(150),
        resizeMode: "center",
        alignSelf: "center",
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

export default ManagerComp;
