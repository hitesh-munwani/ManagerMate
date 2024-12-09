import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, IMAGES } from "../../assets";
import { STRINGS } from "../../constants/strings";
import Text from "../../component/Text";
import { getScaleSize } from "../../constants/scaleSize";
import { SCREENS } from "..";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const navigation = useNavigation(); // Get the navigation object

  const handleLogin = () => {
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Password:", rememberPassword);

    // Navigate to HomeScreen upon successful login
    navigation.navigate(SCREENS.HomeScreen.identifier, {
      from: 'Manager'
    });
  };

  const handleEmployee = () => {

    // Navigate to HomeScreen upon successful login
    navigation.navigate(SCREENS.HomeScreen.identifier, {
      from: 'Employee'
    });
  };


  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topContainer}>
            <Image
              source={IMAGES.logo}
              style={styles.logo}
            />
            <Text style={styles.text}>
              By signing in you are agreeing {"\n"} our
              <Text style={styles.link}> Term and privacy policy</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.email_address}
              value={email}
              onChangeText={(text) => {
                setEmail(text)
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={STRINGS.password}
              value={password}
              onChangeText={(text) => {
                setPassword(text)
              }}
              secureTextEntry
            />
            <View style={styles.options}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setRememberPassword(!rememberPassword)}
                >
                  {rememberPassword && <View style={styles.checkedBox} />}
                </TouchableOpacity>
                <Text
                  color={COLORS._666}
                  size={getScaleSize(12)}>
                  {STRINGS.remember_password}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Forgot password pressed")}
              >
                <Text style={styles.optionText}>{STRINGS.forget_password}</Text>
              </TouchableOpacity>
            </View>
            {/* <Text title="Login" onPress={handleLogin} /> */}
            <TouchableOpacity onPress={handleLogin} style={{ alignItems: 'center' }}>
              <Text style={styles.taskStatus}
                color={COLORS._1E90FF}
                size={getScaleSize(18)}>
                {"Login"}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: getScaleSize(16) }}>
              <TouchableOpacity onPress={handleLogin} style={{ alignItems: 'center' }}>
                <Text style={styles.taskStatus}
                  color={COLORS._1E90FF}
                  size={getScaleSize(18)}>
                  {"Manager"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEmployee} style={{ alignItems: 'center', marginLeft: getScaleSize(16) }}>
                <Text style={styles.taskStatus}
                  color={COLORS._1E90FF}
                  size={getScaleSize(18)}>
                  {"Employee"}
                </Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Image
              style={styles.image}
              source={IMAGES.btmImg}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
  },
  topContainer: {
    paddingHorizontal: getScaleSize(20),
  },
  logo: {
    marginTop: getScaleSize(50),
    resizeMode: "center",
    alignSelf: "center",
  },
  text: {
    color: COLORS.black,
    marginTop: -40,
    marginBottom: 50,
    textAlign: "center",
  },
  link: {
    color: "#1E90FF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: COLORS.black,
    padding: getScaleSize(10),
    marginBottom: getScaleSize(10),
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  checkedBox: {
    width: 14,
    height: 14,
    backgroundColor: "#000",
  },
  optionText: {
    fontSize: 12,
    color: "#666",
  },
  bottomContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 200, // Adjust height as needed
  },
});

export default LoginScreen;
