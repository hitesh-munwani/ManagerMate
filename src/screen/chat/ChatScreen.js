// app/ChatScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import Header from "../../component/Header";
import { getScaleSize } from "../../constants/scaleSize";
import { COLORS, IMAGES } from "../../assets";
import Text from "../../component/Text";
import { STRINGS } from "../../constants/strings";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [openFileModal, setopenFileModal] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), text: inputText },
      ]);
      setInputText("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={STRINGS.chat} navigation={props} />
      <FlatList
        style={{ marginTop: getScaleSize(24), marginHorizontal: getScaleSize(16) }}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      {
        openFileModal ?
          <View style={styles.fileModalStyle}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={IMAGES.image}
                style={styles.imageStyle}
              />
              <Text
                color="black"
                size={getScaleSize(14)}>Image</Text>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: getScaleSize(32) }}>
              <Image
                source={IMAGES.video}
                style={styles.imageStyle}
              />
              <Text
                color="black"
                size={getScaleSize(14)}>Video</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={IMAGES.file}
                style={styles.imageStyle}
              />
              <Text
                color="black"
                size={getScaleSize(14)}>File</Text>
            </View>
          </View>
          : null
      }

      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TouchableOpacity onPress={() => {
            if (openFileModal) {
              setopenFileModal(false)
            } else {
              setopenFileModal(true)
            }
          }}>
            <Image
              source={IMAGES.selectfile}
              style={styles.fileStyle}
            />
          </TouchableOpacity>
          <TextInput
            style={{ marginLeft: getScaleSize(8), color: COLORS.black }}
            value={inputText}
            placeholderTextColor={COLORS._999}
            onChangeText={setInputText}
            placeholder="Type a message"
          />
        </View>

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text color="white"
            size={getScaleSize(14)}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: getScaleSize(10),
  },
  messageContainer: {
    padding: getScaleSize(10),
    backgroundColor: COLORS._1E90FF,
    borderRadius: getScaleSize(5),
    marginVertical: getScaleSize(5),
    alignSelf: "flex-start",
  },
  messageText: {
    // message inside
    fontSize: getScaleSize(16),
    color: COLORS.white,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: getScaleSize(16)
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: 'row',
    borderRadius: getScaleSize(5),
    paddingHorizontal: getScaleSize(8),
    alignItems: 'center'
  },
  sendButton: {
    backgroundColor: COLORS._1E90FF,
    padding: getScaleSize(10),
    borderRadius: getScaleSize(5),
    marginLeft: getScaleSize(10),
  },
  fileStyle: {
    height: getScaleSize(24),
    width: getScaleSize(24),
    resizeMode: 'contain',
  },
  imageStyle: {
    height: getScaleSize(40),
    width: getScaleSize(40),
    resizeMode: 'contain',
    marginBottom: getScaleSize(8)
  },
  fileModalStyle: {
    backgroundColor: COLORS.white,
    borderRadius: getScaleSize(12),
    padding: getScaleSize(8),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: getScaleSize(16),
    marginBottom: getScaleSize(16)
  }
});

export default ChatScreen;
