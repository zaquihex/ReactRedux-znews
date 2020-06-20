import { combineReducers } from 'redux';
import { localizeReducer as localize } from "react-localize-redux";
import commonReducer from './common';
import newsReducer from './news';
import covidReducer from './coronavirus';
export default combineReducers({
    localize,
    commonReducer,
    newsReducer,
    covidReducer
});