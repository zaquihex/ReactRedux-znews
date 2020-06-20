// actions list
export const actions = {
  GET_CORONAVIRUS_INFO_START: "GET_CORONAVIRUS_INFO_START",
  GET_CORONAVIRUS_INFO_SUCCESS: "GET_CORONAVIRUS_INFO_SUCCESS",
  GET_CORONAVIRUS_INFO_FAILED: "GET_CORONAVIRUS_INFO_FAILED",
};

export const getCoronavirusInfoStart = (country) => ({
  type: actions.GET_CORONAVIRUS_INFO_START,
  payload: { country }
});
export const getCoronavirusInfoSuccess = (response) => ({
  type: actions.GET_CORONAVIRUS_INFO_SUCCESS,
  payload: response,
});

export const getCoronavirusInfoFailed = (error) => ({
  type: actions.GET_CORONAVIRUS_INFO_FAILED,
  payload: error,
});

