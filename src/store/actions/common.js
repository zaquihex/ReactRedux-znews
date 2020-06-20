// actions list
export const actions = {
  SET_LANGUAGE_APP: "SET_LANGUAGE_APP",
  SET_VALORATION_APP: "SET_VALORATION_APP"
};

export const setLanguageApp = newLanguageApp => ({
  type: actions.SET_LANGUAGE_APP,
  payload: newLanguageApp
});

export const setValorationApp = valoration => ({
  type: actions.SET_VALORATION_APP,
  payload: valoration
});
