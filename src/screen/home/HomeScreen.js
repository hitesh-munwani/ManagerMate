// app/HomeScreen.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,

} from "react-native";

import { getScaleSize } from "../../constants/scaleSize";
import Header from "../../component/Header";
import ManagerComp from "./component/ManagerComp";
import EmployeeComp from "./component/EmployeeComp";
import SuccessModal from "../../modal/SuccessModal";
import { COLORS } from "../../assets";

const HomeScreen = (props) => {


  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.topContainer}>

        <Header title={'DashBoard'} navigation={props} />
      </View>
      <>
        {
          props?.route?.params?.from == 'Manager' ?
            <ManagerComp navigation={props} />
            : <EmployeeComp navigation={props} />
        }
      </>
    </View>
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
    height: Platform.OS == 'ios' ? getScaleSize(120) : getScaleSize(86),
    paddingTop: Platform.OS == 'ios' ? getScaleSize(66) : getScaleSize(16),
  },

});

export default HomeScreen;
