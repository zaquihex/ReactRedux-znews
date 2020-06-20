import { put, takeEvery } from 'redux-saga/effects'
import { actions, getCoronavirusInfoSuccess, getCoronavirusInfoFailed } from 'store/actions/coronavirus';

function* getCoronavirusData({ payload }) {
    const { country } = payload;
    let countryParam = "us";
    if (country !== "All") {
        countryParam = country;
    }

    try {
        
        const response = yield fetch(`https://api.thevirustracker.com/free-api?countryTimeline=${countryParam}`);
        const responseParsed = yield response.json();
        
        if (!responseParsed.timelineitems) {
            yield put(getCoronavirusInfoFailed({ code: 'API ERROR', message: 'thevirustracker API response is not correct' }));
        } else {
            const data = responseParsed.timelineitems[0];
            const listKeys = Object.keys(data);
            const keysMonth = listKeys.slice(
                listKeys.length - 31,
                listKeys.length - 1
            );
            
            const dataParsed = keysMonth.map((key, pos) => ({
                indexX: key.substring(0, 4),
                indexYDailyCases: data[key].new_daily_cases,
                indexYDailyDeaths: data[key].new_daily_deaths,
                indexYTotalCases: data[key].total_cases,
                indexYTotalRecoveries: data[key].total_recoveries,
                indexYTotalDeaths: data[key].total_deaths,
            }));
            yield put(getCoronavirusInfoSuccess(dataParsed));
        }
    }
    catch (error) {
        yield put(getCoronavirusInfoFailed({ code: 'API ERROR', message: 'thevirustracker API response is not correct' }));
    }
}

export function* watchCoronavirusData() {
    yield takeEvery(actions.GET_CORONAVIRUS_INFO_START, getCoronavirusData)
}
