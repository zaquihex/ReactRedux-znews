//imports to call services
import axios from "axios";
import { token } from "constants/api";

//mockups
// import sources from "mockups/sources.json";
// import articles from "mockups/articles.json";

// actions list
export const actions = {
  GET_NEWS_START: "GET_NEWS_START",
  GET_NEWS_SUCCESS: "GET_NEWS_SUCCESS",
  GET_NEWS_FAILED: "GET_NEWS_FAILED",
  
  GET_SOURCES_START: "GET_SOURCES_START",
  GET_SOURCES_SUCCESS: "GET_SOURCES_SUCCESS",
  GET_SOURCES_FAILED: "GET_SOURCES_FAILED",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_COUNTRY: "SET_COUNTRY",
  SET_CATEGORY: "SET_CATEGORY",
  SET_SOURCE: "SET_SOURCE",
  SET_TABNEWS: "SET_TABNEWS",
  SET_TAGS_ARTICLES: "SET_TAGS_ARTICLES",
  SET_REQUESTS_NEWSAPI: "SET_REQUESTS_NEWSAPI",
};


export const getNewsStart = (tabNews) => ({
  type: actions.GET_NEWS_START,
  payload: { tabNews },
});

export const getNewsSuccess = (response) => ({
  type: actions.GET_NEWS_SUCCESS,
  payload: response,
});

export const getNewsFailed = (tabNews,error) => ({
  type: actions.GET_NEWS_FAILED,
  payload: {tabNews, error},
});


export const getNews = (
  language,
  country,
  category,
  source,
  tabNews,
  tagsArticles
) => {
  return (dispatch) => {
    dispatch(getNewsStart(tabNews));
    let languageParam = "";
    if (language !== "All") {
      languageParam = "&language=" + language;
    }
    let countryParam = "";
    if (country !== "All" && source === "All" && tabNews === "topNews") {
      countryParam = "&country=" + country;
    }
    let categoryParam = "";
    if (category !== "All" && source === "All" && tabNews === "topNews") {
      categoryParam = "&category=" + category;
    }
    let sourcesParam = "";
    if (source !== "All") {
      sourcesParam = "&sources=" + source;
    }

    let listWords = tagsArticles.map((tag, pos) =>
      pos + 1 === tagsArticles.length ? tag : tag + " AND "
    );
    listWords = listWords.toString();
    listWords = "&q=(" + listWords.replace(",", "") + ")";
    //dispatch(getNewsSuccess(articles));
    if (tabNews === "topNews") {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?apiKey=` +
            token +
            "&pageSize=100" +
            languageParam +
            countryParam +
            categoryParam +
            sourcesParam
        )
        .then((res) => {
          dispatch(getNewsSuccess(res.data));
        })
        .catch((error) => {
          dispatch(getNewsFailed(tabNews,error));
        });
    } else {
      axios
        .get(
          `https://newsapi.org/v2/everything?apiKey=` +
            token +
            "&pageSize=100" +
            listWords +
            languageParam +
            sourcesParam +
            "&sortBy=popularity"
        )
        .then((res) => {
          dispatch(getNewsSuccess(res.data));
        })
        .catch((error) => {
          dispatch(getNewsFailed(tabNews,error));
        });
    }
  };
};





















export const setTagsArticles = (newTagsArticles) => ({
  type: actions.SET_TAGS_ARTICLES,
  payload: newTagsArticles,
});

export const setTabnews = (newTabnews) => ({
  type: actions.SET_TABNEWS,
  payload: newTabnews,
});

export const setSource = (newSource) => ({
  type: actions.SET_SOURCE,
  payload: newSource,
});

export const setCategory = (newCategory) => ({
  type: actions.SET_CATEGORY,
  payload: newCategory,
});

export const setCountry = (newCountry) => ({
  type: actions.SET_COUNTRY,
  payload: newCountry,
});

export const setLanguage = (newLanguage) => ({
  type: actions.SET_LANGUAGE,
  payload: newLanguage,
});

export const getSourcesStart = () => ({
  type: actions.GET_SOURCES_START,
});
export const getSourcesSuccess = (response) => ({
  type: actions.GET_SOURCES_SUCCESS,
  payload: response,
});

export const getSourcesFailed = (error) => ({
  type: actions.GET_SOURCES_FAILED,
  payload: error,
});

export const getSources = (language, country, category) => {
  return (dispatch) => {
    dispatch(getSourcesStart());
    let languageParam = "";
    if (language !== "All") {
      languageParam = "&language=" + language;
    }
    let countryParam = "";
    if (country !== "All") {
      countryParam = "&country=" + country;
    }
    let categoryParam = "";
    if (category !== "All") {
      categoryParam = "&category=" + category;
    }

    //dispatch(getSourcesSuccess(sources.sources));
    axios
      .get(
        `https://newsapi.org/v2/sources?apiKey=` +
          token +
          "&pageSize=100" +
          languageParam +
          countryParam +
          categoryParam
      )
      .then((res) => {
        dispatch(getSourcesSuccess(res.data.sources));
      })
      .catch((error) => {
        dispatch(getSourcesFailed(error));
      });
  };
};
