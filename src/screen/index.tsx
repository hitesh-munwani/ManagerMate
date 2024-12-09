import AttendanceLocationTracking from "./attendace/AttendanceLocationTracking";
import AttendanceScreen from "./attendace/AttendanceScreen";
import ChatScreen from "./chat/ChatScreen";
import EmployeeScreen from "./generatereport/EmployeeScreen";
import GenerateReportScreen from "./generatereport/GenerateReportScreen";
import HomeScreen from "./home/HomeScreen";
import LocationTracking from "./locationtracking/LocationTracking";
import LoginScreen from "./login/LoginScreen";
import AssignTasks from "./task/AssignTasks";
import EmployeeAssignTasks from "./task/EmployeeAssignTasks";
import TaskList from "./task/TaskList";


export const SCREENS = {
    LoginScreen: {
        identifier: 'LoginScreen',
        component: LoginScreen
    },
    HomeScreen: {
        identifier: 'HomeScreen',
        component: HomeScreen
    },
    ChatScreen: {
        identifier: 'ChatScreen',
        component: ChatScreen
    },
    TaskList: {
        identifier: 'TaskList',
        component: TaskList
    },
    LocationTracking: {
        identifier: 'LocationTracking',
        component: LocationTracking
    },
    AssignTasks: {
        identifier: 'AssignTasks',
        component: AssignTasks
    },
    EmployeeAssignTasks: {
        identifier: 'EmployeeAssignTasks',
        component: EmployeeAssignTasks
    },
    AttendanceScreen: {
        identifier: 'AttendanceScreen',
        component: AttendanceScreen
    },
    AttendanceLocationTracking: {
        identifier: 'AttendanceLocationTracking',
        component: AttendanceLocationTracking
    },
    GenerateReportScreen: {
        identifier: 'GenerateReportScreen',
        component: GenerateReportScreen
    },
    EmployeeScreen: {
        identifier: 'EmployeeScreen',
        component: EmployeeScreen
    },

}