import { actions } from "store/actions/news";
const initialState = {
  compactmode: true,
  tagsArticles: ["covid"],
  tabNews: "topNews",
  language: "en",
  country: "All",
  category: "All",
  source: "All",
  sources: [],
  loadingNews: false,
  news: null,
  loadingSources: false,
  error: null,
  errorTopNews: null,
  errorArticles: null,
};

const saveStore = (state) => {
  sessionStorage.setItem("newsStore", JSON.stringify(state));
};

const loadStore = () => {
  return JSON.parse(sessionStorage.getItem("newsStore"));
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case actions.SET_TAGS_ARTICLES:
      newState = {
        ...state,
        tagsArticles: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.SET_TABNEWS:
      newState = {
        ...state,
        tabNews: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.SET_SOURCE:
      newState = {
        ...state,
        source: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.SET_CATEGORY:
      newState = {
        ...state,
        category: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.SET_COUNTRY:
      newState = {
        ...state,
        country: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.SET_LANGUAGE:
      newState = {
        ...state,
        language: action.payload,
      };
      saveStore(newState);
      return newState;
    case actions.GET_SOURCES_START:
      newState = {
        ...state,
        error: null,
        loadingSources: true,
        sources: null,
      };
      saveStore(newState);
      return newState;
    case actions.GET_SOURCES_SUCCESS:
      newState = {
        ...state,
        loadingSources: false,
        sources: action.payload,
        source: "All",
      };
      saveStore(newState);
      return newState;
    case actions.GET_SOURCES_FAILED:
      newState = {
        ...state,
        loadingSources: false,
        error: action.payload,
      };
      saveStore(newState);
      return newState;




      
    case actions.GET_NEWS_START:
      const tabNews = action.payload.tabNews;
      let error = {};
      if (tabNews === "topNews") {
        error = { errorTopNews: null };
      } else {
        error = { errorArticles: null };
      }
      newState = {
        ...state,
        errorTopNews: null,
        loadingNews: true,
        news: null,
        ...error,
      };
      return newState;
    case actions.GET_NEWS_SUCCESS:
      newState = {
        ...state,
        loadingNews: false,
        news: action.payload
      };
      return newState;
    case actions.GET_NEWS_FAILED:
      const tab = action.payload.tabNews;
      let err = {};
      if (tab === "topNews") {
        err = { errorTopNews: action.payload.error };
      } else {
        err = { errorArticles: action.payload.error };
      }
      newState = {
        ...state,
        loadingNews: false,
        ...err
      };
      return newState;






    default:
      const storeSaved = loadStore();
      if (storeSaved) {
        return storeSaved;
      }
      return state;
  }
};
