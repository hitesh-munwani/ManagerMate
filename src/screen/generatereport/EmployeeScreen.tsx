// app/HomeScreen.js
import React, { useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    FlatList
} from "react-native";
import { getScaleSize } from "../../constants/scaleSize";
import { COLORS, IMAGES } from "../../assets";
import { SCREENS } from "..";
import { STRINGS } from "../../constants/strings";
import Header from "../../component/Header";
import Text from "../../component/Text";

interface EmployeeList {
    id: string;
    name: string;
}

const EmployeeScreen = (props: any) => {


    const users: EmployeeList[] = [
        {
            id: '1',
            name: "Bella"
        },
        {
            id: '2',
            name: "Adam"
        },
        {
            id: '3',
            name: "Austin"
        },
        {
            id: '5',
            name: "Robert",
        },
        {
            id: '6',
            name: "Bella"
        },
        {
            id: '7',
            name: "Adam"
        },
        {
            id: '8',
            name: "Austin"
        },
        {
            id: '9',
            name: "Robert",
        },
    ];

    const renderTaskItem = ({ item }: { item: EmployeeList }) => (
        <TouchableOpacity onPress={() => {
            props.navigation.navigate(SCREENS.GenerateReportScreen.identifier)

        }} style={styles.taskItem}>
            <Image
                source={IMAGES.user}
                resizeMode='contain'
                style={styles.taskTitle} />
            <Text style={styles.taskDescription}>{item.name}</Text>

        </TouchableOpacity>
    );


    return (
        <View style={styles.viewContainer}>
            <Header title={STRINGS.employee} navigation={props} />
            <FlatList
                data={users}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
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
    },
    calendarImage: {
        height: getScaleSize(24),
        width: getScaleSize(24),
        marginRight: getScaleSize(8)
    },
    calendarbackStyle: {
        borderRadius: getScaleSize(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: COLORS._1E90FF,
        padding: getScaleSize(8),
        marginTop: getScaleSize(16),
        borderWidth: 1,
        marginHorizontal: getScaleSize(16)
    },
    list: {
        marginTop: getScaleSize(16),
        marginHorizontal: getScaleSize(16),
    },
    taskItem: {
        backgroundColor: COLORS._f0f0f0,
        padding: getScaleSize(8),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: getScaleSize(10),
        borderRadius: getScaleSize(10),
    },
    taskTitle: {
        height: getScaleSize(36),
        width: getScaleSize(36),
        marginRight: getScaleSize(8)
    },
    taskDescription: {
        marginTop: getScaleSize(5),
        color: COLORS._666,
    },
});

export default EmployeeScreen;
