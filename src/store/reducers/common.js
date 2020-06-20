import { actions } from "store/actions/common";
const initialState = {
  languageApp: "en",
  valoration: null,
};

const saveStore = (state) => {
  sessionStorage.setItem("common", JSON.stringify(state));
};

const loadStore = () => {
  return JSON.parse(sessionStorage.getItem("common"));
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actions.SET_LANGUAGE_APP:
      newState = {
        ...state,
        languageApp: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.SET_VALORATION_APP:
      newState = {
        ...state,
        valoration: action.payload,
      };
      saveStore(newState);
      return newState;
    default:
      const storeSaved = loadStore();
      if (storeSaved) {
        return storeSaved;
      }
      return state;
  }
};

