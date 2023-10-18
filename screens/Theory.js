import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
// import serverTheoryData from "../Data/serverTheoryData";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
// import AwesomeButton from "react-native-really-awesome-button";
// import { COLORS } from "../constants";
import { useContext } from "react";
import { AppContext } from "../Context";

export default function Theory() {
  const { serverTheoryData } = useContext(AppContext);
  const [modalWindow, setModalWindow] = useState(false);
  const [numberOfTheory, setNumberOfTheory] = useState("1");
  const fullTextReturn = () => {
    for (let i = 0; i < serverTheoryData.length; i++) {
      if (serverTheoryData[i].key == numberOfTheory) {
        return [serverTheoryData[i].fullText, serverTheoryData[i].video];
      }
    }
  };
  return (
    <View style={styles.container}>
      <Modal visible={modalWindow} animationType="fade">
        <View
          style={{
            backgroundColor: "#252c4a",
            flex: 1,
          }}
        >
          <Ionicons
            name="close-circle"
            size={34}
            color="red"
            style={[styles.iconClose, { marginTop: 20 }]}
            onPress={() => setModalWindow(false)}
          />
          <View
            style={{
              height: "33%",
              display: numberOfTheory == "0" ? "none" : "flex",
            }}
          >
            <YoutubePlayer
              height={"100%"}
              play={false}
              // style={
              //   {
              //     // display: "none",
              //   }
              // }
              videoId={fullTextReturn()[1]}
            />
          </View>
          {/* <View styles={{}}> */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: "85%",
              marginBottom: "10%",
            }}
          >
            <Text
              style={{
                // marginTop: 20,
                marginHorizontal: "5%",
                fontFamily: "Montserrat_400Regular",
                color: "white",
              }}
            >
              {fullTextReturn()[0]}
            </Text>
          </ScrollView>
          {/* </View> */}
        </View>
      </Modal>
      <FlatList
        style={{ width: "100%", marginBottom: "30%" }}
        data={serverTheoryData}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setNumberOfTheory(item.key);
              setModalWindow(true);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 20,
              marginRight: 0,
              borderWidth: 3,
              borderColor: "#4285f4",
              borderRadius: 100,
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
              }}
            />
            <Text
              style={{
                padding: 10,
                paddingTop: item.key == "0" ? 35 : 20,
                flexShrink: 1,
                fontSize: 27,
                fontFamily: "Montserrat_700Bold",
              }}
            >
              {item.textPreview}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: "5%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#252c4a",
  },
  iconClose: {
    textAlign: "center",
    marginBottom: 15,
  },
});
