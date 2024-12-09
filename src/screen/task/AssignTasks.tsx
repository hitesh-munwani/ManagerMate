import React, { useState } from "react";
import {
    FlatList,
    ImageBackground,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../component/Header";
import { STRINGS } from "../../constants/strings";
import Text from "../../component/Text";
import { getScaleSize } from "../../constants/scaleSize";
import SelectDropdown from 'react-native-select-dropdown'
import SuccessModal from "../../modal/SuccessModal";
import { COLORS, IMAGES } from "../../assets";

interface User {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const AssignTasks = (props: any) => {

    const [showAttendanceModel, setShowAttendanceModel] = useState<boolean>(false);

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

    const users: User[] = [
        {
            id: '1',
            title: "SOCIAL MANAGEMENT",
            description: "PERFORMANCE",
            dueDate: "BELLA",
            status: "Assign",
        },
        {
            id: '2',
            title: "SOCIAL MANAGEMENT",
            description: "PERFORMANCE",
            dueDate: "Dubai",
            status: "Assign",
        },
        {
            id: '3',
            title: "SOCIAL MANAGEMENT",
            description: "PERFORMANCE",
            dueDate: "Pakistan",
            status: "Assign",
        },
        {
            id: '4',
            title: "SOCIAL MANAGEMENT",
            description: "PERFORMANCE",
            dueDate: "Sandeep",
            status: "Assign",
        },
    ];


    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={styles.itemStyle}>
                <Text color={COLORS.white} size={getScaleSize(14)}>{item}</Text>
            </View>
        </View>
    );

    const renderTaskItem = ({ item }: { item: User }) => (
        <ImageBackground source={
            item.id == '1' ? IMAGES.image1 : item.id == '2' ? IMAGES.image2 : item.id == '3' ? IMAGES.image3 : IMAGES.image4
        } style={styles.taskItem} borderRadius={getScaleSize(12)}>
            <View style={styles.itemViewStyle}>
                <View style={{ flex: 1, }} />
                <View>
                    <Text color={COLORS.white} size={getScaleSize(36)}>{item.dueDate}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: getScaleSize(12), alignItems: 'center' }}>
                        <FlatList
                            data={['SOCIAL MANAGEMENT', 'PERFORMANCE',]}
                            horizontal
                            renderItem={renderItem}
                            keyExtractor={item => item}
                        />
                        <TouchableOpacity onPress={() => {
                            setShowAttendanceModel(true)
                        }} style={{ marginLeft: getScaleSize(8) }}>
                            <Text style={styles.taskStatus1}
                                color={COLORS.white}
                                size={getScaleSize(14)}>
                                {item.status}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            <Header title={STRINGS.assign_tasks} navigation={props} />
            <View style={{ flex: 1, marginTop: getScaleSize(8) }}>
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
                <FlatList
                    data={users}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.list}
                />
            </View>
            <SuccessModal
                showAttendanceModel={showAttendanceModel}
                setShowAttendanceModel={setShowAttendanceModel}
                successText={'Task Assign Success'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Platform.OS == 'ios' ? getScaleSize(120) : getScaleSize(86),
        paddingTop: Platform.OS == 'ios' ? getScaleSize(66) : getScaleSize(16),
        backgroundColor: COLORS.white
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
    taskItem: {
        backgroundColor: COLORS._f0f0f0,
        height: getScaleSize(210),
        marginBottom: getScaleSize(10),
        borderRadius: getScaleSize(10),
    },
    taskTitle: {
        fontSize: getScaleSize(18),
        fontWeight: "bold",
    },
    taskDescription: {
        marginTop: getScaleSize(5),
        color: COLORS._666,
    },
    taskDueDate: {
        marginTop: getScaleSize(5),
        color: COLORS._999,
    },
    taskStatus1: {
        backgroundColor: COLORS._1E90FF,
        paddingHorizontal: getScaleSize(12),
        paddingVertical: getScaleSize(6),
        borderRadius: getScaleSize(12),
        fontWeight: "bold",
        alignItems: 'flex-end',
        textAlign: 'right',
    },
    list: {
        marginHorizontal: getScaleSize(16),
        marginTop: getScaleSize(8)
    },
    itemStyle: {
        borderColor: COLORS.white,
        borderWidth: 1,
        backgroundColor: COLORS._666,
        paddingHorizontal: getScaleSize(8),
        paddingVertical: getScaleSize(4),
        borderRadius: getScaleSize(18)
    },
    itemViewStyle: {
        flex: 1,
        borderRadius: getScaleSize(10),
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        padding: getScaleSize(12),
    }
});

export default AssignTasks;