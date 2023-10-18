import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  // ScrollView,
} from "react-native";
// import serverTheoryData from "../Data/TheoryData";
// import { Ionicons } from "@expo/vector-icons";
// import YoutubePlayer from "react-native-youtube-iframe";
import Quiz from "./Quiz";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context";
// import serverPracticeData from "../Data/PracticeData";
// import Tests from "../Data/Tests/Data";

export default function Practice() {
  const {
    // state,
    setNumberOfPractice,
    heart,
    // updateHeart,
    // database,
    // id,
    // heartInterval,
    // setHeartInterval,
    // setTime,
    powers,
    numberOfPractice,
    serverData,
    serverPracticeData,
    serverTheoryData,
  } = useContext(AppContext);
  const [modalWindow, setModalWindow] = useState(false);
  const [test, setTest] = useState([]);
  const [work, setWork] = useState(0);
  let inAppPracticeData = [...serverPracticeData];
  inAppPracticeData.sort((a, b) => {
    return (
      parseInt(a.complexity.slice(-1), 10) -
      parseInt(b.complexity.slice(-1), 10)
    );
  });

  const randomArrayShuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  useEffect(() => {
    if (work != 0) {
      let choosenTest = [...serverData[numberOfPractice]];
      // console.log(choosenTest);
      function generateTests(choosenTest) {
        for (let i = 0; i < serverData.length; i++) {
          serverData[i][2] = powers[i];
        }
        return serverData;
      }
      let data = generateTests(choosenTest);
      function forQuestions(data) {
        const Questions = randomArrayShuffle(
          Object.assign([], data[numberOfPractice][1])
        );
        // let shuffled = questions.sort(() => 0.5 - Math.random());
        const questions = Questions.slice(0, 10);
        let new_questions = [];

        for (let i = 0; i < questions.length; i++) {
          let newQuestion = questions[i];
          let options = [
            Math.round(
              parseFloat(questions[i].correct_option.replace(",", ".")) * 100
            ) / 100,
          ];

          const n = 4;

          // Initial empty array
          const arr = options;

          // Null check
          // if (n == 0) {
          //   console.log(null);
          // }

          do {
            // Generating random number
            const randomNumber = (Math.floor(Math.random() * 100) + 1) / 100;

            // Pushing into the array only
            // if the array does not contain it
            if (!arr.includes(randomNumber)) {
              arr.push(randomNumber);
            }
          } while (arr.length < n);
          // while (new Set(options).size != 4) {
          //   options = [
          //     Math.round(questions[i].correct_option.replace(",", ".") * 100) /
          //       100,
          //     String(Math.round(Math.random() * 100) / 100),
          //     String(Math.round(Math.random() * 100) / 100),
          //     String(Math.round(Math.random() * 100) / 100),
          //   ];
          // }
          newQuestion.options = randomArrayShuffle(arr);

          newQuestion.correct_option = String(
            Math.round(parseFloat(newQuestion.correct_option) * 100) / 100
          );
          // console.log(newQuestion);
          new_questions.push(newQuestion);
        }
        return new_questions;
      }

      let allQuestions = forQuestions(data);
      setTest(allQuestions);
      setModalWindow(true);
    }
  }, [numberOfPractice, work]);

  const fullTextReturn = () => {
    for (let i = 0; i < serverTheoryData.length; i++) {
      if (serverTheoryData[i].key == numberOfTheory) {
        return [serverTheoryData[i].fullText, serverTheoryData[i].video];
      }
    }
  };
  return (
    <View style={styles.container}>
      <Modal visible={modalWindow} animationType="slide" transparent={false}>
        <Quiz
          setModalWindow={setModalWindow}
          modalWindow={modalWindow}
          test={test}
          setTest={setTest}
          setWork={setWork}
        />
      </Modal>

      <FlatList
        style={{ width: "100%", marginBottom: "30%" }}
        data={inAppPracticeData}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (heart > 0) {
                setNumberOfPractice(parseInt(item.key, 10));
                setWork(Math.random() * 47 + 14);
                // useEffect(() => {
                //   let choosenTest = [...serverData[numberOfPractice]];
                //   console.log(choosenTest);
                //   function generateTests(choosenTest) {
                //     for (let i = 0; i < Tests.length; i++) {
                //       serverData[i][2] = powers[i];
                //     }
                //     return serverData;
                //   }
                //   let data = generateTests(choosenTest);
                //   function forQuestions(data) {
                //     const Questions = Object.assign(
                //       [],
                //       data[numberOfPractice][1]
                //     );
                //     // let shuffled = questions.sort(() => 0.5 - Math.random());
                //     const questions = Questions.slice(0, 1);
                //     let new_questions = [];
                //     for (let i = 0; i < questions.length; i++) {
                //       let newQuestion = questions[i];
                //       let options = [];
                //       while (new Set(options).size != 4) {
                //         options = [
                //           questions[i].correct_option,
                //           String(Math.round(Math.random() * 100) / 100),
                //           String(Math.round(Math.random() * 100) / 100),
                //           String(Math.round(Math.random() * 100) / 100),
                //         ];
                //       }
                //       newQuestion.options = options;
                //       new_questions.push(newQuestion);
                //     }
                //     return new_questions;
                //   }

                //   const allQuestions = forQuestions(data);
                //   setTest(allQuestions);
                //   setModalWindow(true);
                // }, [numberOfPractice]);
              }
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
              marginBottom: item.key == "13" ? 70 : 0,
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
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  paddingTop: 10,
                  flexShrink: 1,
                  fontSize: 14,
                  fontFamily: "Montserrat_700Bold",
                }}
              >
                {item.complexity}
              </Text>
              <View>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    flexShrink: 1,
                    fontSize: 24,
                    fontFamily: "Montserrat_700Bold",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252c4a",
    flex: 1,
    paddingHorizontal: "5%",
    // paddingTop: 20,
    alignItems: "center",
    alignContent: "center",
  },
  iconClose: {
    textAlign: "center",
    marginBottom: 15,
  },
});
