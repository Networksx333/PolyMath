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
  SET_TIME,
  SET_STATE_DEFAULT,
  SET_POWERS,
} from "./screens/types";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.text };
    case CHANGE_PASSWORD:
      return { ...state, password: action.text };
    case SHOW_WARNING_MODAL:
      return { ...state, exist: action.exist };
    case UPDATE_USER:
      return { ...action.state };
    case SET_LOGGED_IN:
      return { ...state, entered: action.logged };
    case SET_NUMBER_OF_PRACTICE:
      return { ...state, numberOfPractice: action.key };
    case UPDATE_CROWN:
      return { ...state, crown: state.crown + action.number };
    case CHANGE_ID:
      return { ...state, id: action.id };
    case UPDATE_HEART:
      return { ...state, heart: state.heart + action.number };
    case SET_TIME:
      return { ...state, time: action.time };
    case SET_POWERS:
      state.powers[action.practice] += 1;
      return { ...state };
    case SET_STATE_DEFAULT:
      return {
        login: "",
        password: "",
        id: "",
        heart: 10,
        crown: 0,
        entered: false,
        powers: [0, 0],
        exist: false,
        numberOfPractice: 0,
      };
    default:
      return state;
  }
};
