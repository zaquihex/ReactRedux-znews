import { actions } from "store/actions/coronavirus";
const initialState = {
    coronavirusInfo: [],
    loadingCovid: false,
    errorCovid: null
};

const saveStore = (state) => {
  sessionStorage.setItem("covidStore", JSON.stringify(state));
};

const loadStore = () => {
  return JSON.parse(sessionStorage.getItem("covidStore"));
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actions.GET_CORONAVIRUS_INFO_START:
      newState = {
        ...state,
        errorCovid: null,
      };
      saveStore(newState);
      return newState;
    case actions.GET_CORONAVIRUS_INFO_SUCCESS:
      newState = {
        ...state,
        coronavirusInfo: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.GET_CORONAVIRUS_INFO_FAILED:
      newState = {
        ...state,
        coronavirusInfo: [],
        errorCovid: action.payload,
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
