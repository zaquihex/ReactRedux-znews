import { createStore, applyMiddleware, compose } from "redux";
//Redux saga
import createSagaMiddleware from 'redux-saga';
import { watchCoronavirusData } from 'store/sagas/coronavirus'

import { renderToStaticMarkup } from 'react-dom/server';
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

import {
  initialize,
  addTranslationForLanguage,
} from "react-localize-redux";

import ENtranslations from "../constants/en.translations.json";
import EStranslations from "../constants/es.translations.json";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;



export default function configureStore() {

  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk];
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

sagaMiddleware.run(watchCoronavirusData);

  const languages = [
    { name: "English", code: "en" },
    { name: "Spanish", code: "es" },
  ];

  store.dispatch(initialize({ languages, options: { defaultLanguage: "en", renderToStaticMarkup } }));
  store.dispatch(addTranslationForLanguage(EStranslations, "es"));
  store.dispatch(addTranslationForLanguage(ENtranslations, "en"));


  return store;
}
