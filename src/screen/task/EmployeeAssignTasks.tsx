import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
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
import Button from "../../component/Button";
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import UploadImagePopup from "../../component/UploadImagePopup";
import { getUserImages } from "../../constants/permissionFunctions";

interface User {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const EmployeeAssignTasks = (props: any) => {

    const [showAttendanceModel, setShowAttendanceModel] = useState<boolean>(false);
    const [showAssignModel, setShowAssignModel] = useState<boolean>(false);
    const mediaRef = useRef(null)
    const [imageFile, setImageFile] = useState<any>(null)

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

    const progressList = [
        { title: 'Pending' },
        { title: 'Inprogress' },
        { title: 'Complete' }
    ];
    const users: User[] = [
        {
            id: '1',
            title: "Complete Project Proposal",
            description: "Write the initial project proposal for the new client.",
            dueDate: "2024-07-20",
            status: "Assign",
        },
        {
            id: '2',
            title: "Review Code Changes",
            description:
                "Review the latest code changes submitted by the development team.",
            dueDate: "2024-07-18",
            status: "Assign",
        },
        {
            id: '3',
            title: "Prepare Presentation Slides",
            description: "Prepare slides for the upcoming project presentation.",
            dueDate: "2024-07-22",
            status: "Assign",
        },
        {
            id: '4',
            title: "Schedule Team Meeting",
            description:
                "Schedule a meeting to discuss project milestones with the team.",
            dueDate: "2024-07-19",
            status: "Assign",
        },
    ];


    async function openCamera() {
        const result = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
        })

        if (!result?.didCancel) {
            setImageFile(result?.assets?.[0])
        }
    }

    async function openLibrary() {
        const result = await launchImageLibrary({
            height: 100,
            width: 100,
            mediaType: 'photo',
            videoQuality: 'high',
        })

        if (!result?.didCancel) {
            setImageFile(result?.assets?.[0])
        }
    }


    const renderTaskItem = ({ item }: { item: User }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskDueDate}>Due: {item.dueDate}</Text>
            <TouchableOpacity onPress={() => {
                setShowAssignModel(true)
            }} style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }} />
                <Text style={styles.taskStatus}
                    color={COLORS.white}
                    size={getScaleSize(14)}>
                    {item.status}
                </Text>
            </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>
            <Header title={STRINGS.assign_tasks} navigation={props} />
            <View style={{ flex: 1, marginTop: getScaleSize(16) }}>
                <FlatList
                    data={users}
                    renderItem={renderTaskItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.list}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAssignModel}
                onRequestClose={() => {
                    setShowAssignModel(!showAssignModel);
                }}
            >
                <TouchableOpacity style={{ flex: 1.0, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                    onPress={() => { setShowAssignModel(!showAssignModel); }}>
                    <View style={styles.modalContainer}>
                        <SelectDropdown
                            data={progressList}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Progress'}
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
                        <TouchableOpacity
                            style={styles.dashedView}
                            activeOpacity={1}
                            onPress={() => {
                                mediaRef?.current?.open()
                            }}>
                            <Image
                                resizeMode={'contain'}
                                style={styles.imageIcon}
                                source={IMAGES.selectimage}
                            />
                            <Text
                                style={{ alignSelf: 'center', marginTop: getScaleSize(8) }}
                                size={getScaleSize(14)}
                                color={'01295F'}>
                                {'Add Image'}
                            </Text>
                        </TouchableOpacity>

                        <Button
                            title={'Submit'}
                            onPress={() => {
                                setShowAssignModel(false)
                                setShowAttendanceModel(true)
                            }}
                        />


                    </View>

                </TouchableOpacity>

            </Modal>

            <UploadImagePopup
                onRef={mediaRef}
                naviagtion={props.navigation}
                data={getUserImages}
                onPress={(e: any, index: number) => {
                    mediaRef?.current?.close()
                    if (index == 0) {
                        setTimeout(() => {
                            openCamera()
                        }, 500);
                    }
                    else if (index == 2) {
                        setTimeout(() => {
                            openLibrary()
                        }, 500);
                    }
                }} />

            <SuccessModal
                showAttendanceModel={showAttendanceModel}
                setShowAttendanceModel={setShowAttendanceModel}
                successText={'Task Update Successfully'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Platform.OS == 'ios' ? getScaleSize(120) : getScaleSize(86),
        paddingTop: Platform.OS == 'ios' ? getScaleSize(66) : getScaleSize(16),
        backgroundColor: '#fff'
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
        padding: getScaleSize(20),
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
    taskStatus: {
        marginTop: getScaleSize(5),
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
    },
    modalContainer: {
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        padding: getScaleSize(12),
        borderRadius: getScaleSize(8),
        backgroundColor: COLORS.white
    },
    dashedView: {
        marginTop: getScaleSize(24),
        marginHorizontal: getScaleSize(16),
        borderRadius: getScaleSize(8),
        marginBottom: getScaleSize(16),
        borderWidth: 1,
        width: '100%',
        borderStyle: 'dashed',
        borderColor: COLORS._E6EAEF,
        paddingVertical: getScaleSize(24)
    },
    imageIcon: {
        height: getScaleSize(48),
        width: getScaleSize(48),
        alignSelf: 'center'
    },
    button: {
        backgroundColor: COLORS._1E90FF,
        padding: getScaleSize(15),
        borderRadius: getScaleSize(20),
        alignItems: "center",
        marginBottom: getScaleSize(20),
        width: "100%",
    },
});

export default EmployeeAssignTasks;