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
import { STRINGS } from "../../constants/strings";
import Header from "../../component/Header";
import Text from "../../component/Text";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'

interface ReportList {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

const GenerateReportScreen = (props: any) => {


    const [selectedStartDate, setSelectedStartDate] = useState<string>('Select Date')
    const [selectedEndDate, setSelectedEndDate] = useState<string>('Select Date')

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow;
    };

    const [date, setDate] = useState({
        openDatePicker: false,
        startDate: new Date(),
        endDate: getTomorrowDate(),
        lastDate: getTomorrowDate(),
        isFrom: ''
    })

    const hideDatePickerReStart = () => {
        setDate((prev: any) => {
            return {
                ...prev,
                openDatePicker: false,
            }
        })
    };

    const handleConfirmReStart = (getDate: any) => {
        if (date.isFrom == 'start') {
            setSelectedStartDate(moment(getDate).format('DD-MM-YYYY'))
            setSelectedEndDate('Select Date')
        } else if (date.isFrom == 'end') {
            setSelectedEndDate(moment(getDate).format('DD-MM-YYYY'))
        }

        hideDatePickerReStart();

    };

    const users: ReportList[] = [
        {
            id: '1',
            title: "Complete Project Proposal",
            description: "Write the initial project proposal for the new client.",
            dueDate: "2024-07-20",
            status: "Present",
        },
        {
            id: '2',
            title: "Review Code Changes",
            description:
                "Review the latest code changes submitted by the development team.",
            dueDate: "2024-07-18",
            status: "Absent",
        },
        {
            id: '3',
            title: "Prepare Presentation Slides",
            description: "Prepare slides for the upcoming project presentation.",
            dueDate: "2024-07-22",
            status: "Present",
        },
        {
            id: '4',
            title: "Schedule Team Meeting",
            description:
                "Schedule a meeting to discuss project milestones with the team.",
            dueDate: "2024-07-19",
            status: "Present",
        },
    ];

    const renderTaskItem = ({ item }: { item: ReportList }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskDueDate}>Date: {item.dueDate}</Text>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskStatus}
                color={item.status == 'Present' ? 'green' : 'red'}
                size={getScaleSize(14)}>
                {item.status}
            </Text>
        </View>
    );


    return (
        <View style={styles.viewContainer}>
            <Header title={STRINGS.report} navigation={props} />

            <View style={styles.calendarViewStyle}>
                <View style={styles.calendarbackStyle}>
                    <TouchableOpacity onPress={() => {
                        setDate((prev: any) => {
                            return {
                                ...prev,
                                openDatePicker: true,
                                isFrom: 'start'
                            }
                        })
                    }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={IMAGES.calendar} style={styles.calendarImage} />
                        <Text
                            align='center'
                            size={getScaleSize(16)}
                            color={COLORS.black}>
                            {selectedStartDate}
                        </Text>
                    </TouchableOpacity>
                    <Image source={IMAGES.rightarrow} style={{ height: getScaleSize(24), width: getScaleSize(24) }} />
                    <TouchableOpacity onPress={() => {
                        if (selectedStartDate) {
                            setDate((prev: any) => {
                                return {
                                    ...prev,
                                    openDatePicker: true,
                                    isFrom: 'end'
                                }
                            })
                        } else {
                            // showMessageToast('Please select start date')
                        }
                    }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={IMAGES.calendar} style={styles.calendarImage} />
                        <Text
                            align='center'
                            size={getScaleSize(16)}
                            color={COLORS.black}>
                            {selectedEndDate}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image source={IMAGES.download} style={styles.downloadImage} />
            </View>
            <FlatList
                data={users}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
            <DateTimePickerModal
                isVisible={date.openDatePicker}
                mode="date"
                onConfirm={handleConfirmReStart}
                onCancel={hideDatePickerReStart}
                date={date.isFrom == 'start' ? date.startDate : date.isFrom == 'end' ? date.startDate : date.endDate}
                minimumDate={date.isFrom == 'start' ? date.startDate : date.isFrom == 'end' ? date.startDate : date.endDate}
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
    downloadImage: {
        height: getScaleSize(32),
        width: getScaleSize(32),
        marginHorizontal: getScaleSize(8),
        alignItems: 'center'
    },
    calendarbackStyle: {
        borderRadius: getScaleSize(12),
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderColor: COLORS._1E90FF,
        padding: getScaleSize(8),
        borderWidth: 1,
    },
    list: {
        marginTop: getScaleSize(16),
        marginHorizontal: getScaleSize(16),
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
        marginBottom: getScaleSize(5),
        color: COLORS._999,
    },
    taskStatus: {
        marginTop: getScaleSize(5),
        fontWeight: "bold",
        alignItems: 'flex-end',
        textAlign: 'right',
    },
    calendarViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: getScaleSize(16),
        marginHorizontal: getScaleSize(16)
    }

});

export default GenerateReportScreen;
