import React, { useReducer, useState, useEffect } from "react";
import { AppContext } from "./Context";
import { AppReducer } from "./AppReducer";
import Constants from "expo-constants";
import Data from "./Data/Tests/Data"
import TheoryData from "./Data/TheoryData";
import PracticeData from "./Data/PracticeData";
import {
  CHANGE_LOGIN,
  CHANGE_PASSWORD,
  SHOW_WARNING_MODAL,
  UPDATE_USER,
  SET_LOGGED_IN,
  UPDATE_CROWN,
  SET_NUMBER_OF_PRACTICE,
  CHANGE_ID,
  UPDATE_HEART,
  SET_STATE_DEFAULT,
  SET_POWERS,
} from "./screens/types";

export const PolyState = ({ children }) => {
  const database = Constants.manifest?.extra?.firebaseDatabase;
  const user = {
    login: "",
    password: "",
    id: "",
    heart: 10,
    crown: 0,
    entered: false,
    powers: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    exist: false,
    numberOfPractice: 0,
  };

  const [state, dispatch] = useReducer(AppReducer, user);
  let Rating = [];
  const [file, setFile] = useState(0);
  const [numberInRating, setNumberInRating] = useState("пока не известен");

  useEffect(async () => {
    setFile([]);
    Rating = [];
    setTimeout(async () => {
      let response = await fetch(database + "users.json", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let data = await response.json();

      for (let id in data) {
        Rating.push({
          points: data[id]["crown"],
          key: data[id]["login"],
        });
      }
      Rating.sort((a, b) => {
        return b.points - a.points;
      });
      // Временное решение, нужно исправить появление отдельно стояющих элементов в базе данных!
      Rating.pop();
      Rating.pop();
      Rating.pop();
      for (let el in Rating) {
        if (Rating[el].key === state.login) {
          setNumberInRating(Rating.findIndex((i) => i == Rating[el]) + 1);
        }
      }
      setFile(Rating);
    }, 0);
  }, [state.crown]);

  const [serverTheoryData, setServerTheoryData] = useState("");
  const [serverData, setServerData] = useState("");
  const [serverPracticeData, setServerPracticeData] = useState("");
  const setStateDefault = () => dispatch({ type: SET_STATE_DEFAULT });
  const changeLogin = (text) => dispatch({ type: CHANGE_LOGIN, text });
  const changePassword = (text) => dispatch({ type: CHANGE_PASSWORD, text });
  const showWarningModal = (exist) =>
    dispatch({ type: SHOW_WARNING_MODAL, exist });
  const updateUser = (state) => dispatch({ type: UPDATE_USER, state });
  const setLoggedIn = (logged) => dispatch({ type: SET_LOGGED_IN, logged });
  const setNumberOfPractice = (key) =>
    dispatch({ type: SET_NUMBER_OF_PRACTICE, key });
  const updateCrown = (number) => dispatch({ type: UPDATE_CROWN, number });
  // const registerNewUser = useEffect(() => {}, []);
  const changeId = (id) => dispatch({ type: CHANGE_ID, id });
  const fetchPutchUser = async (state, id) => {
    await fetch(database + `users/${id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...state }),
    });
  };
  const [heartInterval, setHeartInterval] = useState(0);
  const updateHeart = (number) => dispatch({ type: UPDATE_HEART, number });
  const setPowers = (practice) => dispatch({ type: SET_POWERS, practice });
  // const setTime = (time) => dispatch({ type: SET_TIME, time });

  const register = async (state) => {
    let response = await fetch(database + "users.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();

    for (let id in data) {
      if (
        data[id]["login"] == state.login ||
        state.password.length < 6 ||
        state.login.length < 2
      ) {
        showWarningModal(true);
        return;
      }
    }
    await updateUser({
      login: state.login,
      password: state.password,
      id: "",
      heart: 10,
      crown: state.crown,
      entered: false,
      powers: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0,
      ],
      exist: false,
      numberOfPractice: 0,
    });
    response = await fetch(database + "users.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...state }),
    });
    data = await response.json();

    // Обновляем данные
    // await fetch(database + "data.json", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ TheoryData, Data, PracticeData }),
    // });

    response = await fetch(database + "data.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    data = await response.json();
    for (let i in data) {
      setServerTheoryData(data[i]["TheoryData"]);
      setServerData(data[i]["Data"]);
      setServerPracticeData(data[i]["PracticeData"]);
    }

    setLoggedIn(true);

    response = await fetch(database + "users.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    data = await response.json();

    for (let id in data) {
      if (
        data[id]["login"] === state.login &&
        data[id]["password"] === state.password
      ) {
        changeId(id);
        fetchPutchUser(state, id);
        return;
      }
    }
  };

  const loginInApp = async () => {
    // Обновляем данные
    // await fetch(database + "data.json", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ TheoryData, Data, PracticeData }),
    // });

    let response = await fetch(database + "users.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    for (let id in data) {
      if (
        data[id]["login"] === state.login &&
        data[id]["password"] === state.password
      ) {
        updateUser(data[id]);
        changeId(id);
        response = await fetch(database + "data.json", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        data = await response.json();
        for (let i in data) {
          setServerTheoryData(data[i]["TheoryData"]);
          setServerData(data[i]["Data"]);
          setServerPracticeData(data[i]["PracticeData"]);
        }
        setLoggedIn(true);
      }
    }
  };

  const onClickRedCircle = (modalOpen) => setIsExist(modalOpen);

  return (
    <AppContext.Provider
      value={{
        state,
        database,
        Rating,
        file,
        numberInRating,
        serverData,
        serverPracticeData,
        serverTheoryData,
        login: state.login,
        password: state.password,
        id: state.id,
        heart: state.heart,
        crown: state.crown,
        exist: state.exist,
        entered: state.entered,
        powers: state.powers,
        numberOfPractice: state.numberOfPractice,
        onClickRedCircle,
        changeLogin,
        changePassword,
        showWarningModal,
        register,
        loginInApp,
        setLoggedIn,
        setNumberOfPractice,
        updateCrown,
        fetchPutchUser,
        updateHeart,
        setHeartInterval,
        setStateDefault,
        setNumberInRating,
        setPowers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
