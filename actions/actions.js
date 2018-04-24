export const actionTypes = {
  FAILURE: 'FAILURE',
  LOAD_DATA: 'LOAD_DATA',
  SEARCH_DATA_SUCCESS: 'SEARCH_DATA_SUCCESS',
  RESULT_DATA_SUCCESS: 'RESULT_DATA_SUCCESS',
  RESULT_SCROLL_DATA_SUCCESS: 'RESULT_SCROLL_DATA_SUCCESS',
  LOAD_WEATHER_DATA: 'LOAD_WEATHER_DATA',
  LOAD_WEATHER_DATA_SUCCESS: 'LOAD_WEATHER_DATA_SUCCESS',
  LOAD_RESULT_DATA: 'LOAD_RESULT_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS'
}

const analytics = (action) => {
  const dataLayer = window.dataLayer || []
  dataLayer.push({
    event: action.type,
    payload: action.payload
  })
}

export function loadWeatherData() {
  return {
    type: actionTypes.LOAD_WEATHER_DATA
  }
}

export function resultLoadWeatherData(data) {
  return {
    type: actionTypes.LOAD_WEATHER_DATA_SUCCESS,
    data
  }
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export function loadData() {
  return { type: actionTypes.LOAD_DATA }
}

export function loadResultData(data) {
  return {
    type: actionTypes.LOAD_RESULT_DATA,
    data
  }
}

export function resultData(data) {
  return {
    type: actionTypes.RESULT_DATA_SUCCESS,
    preference: 'SEARCH',
    data
  }
}

export function resultDataScroll(data) {
  return {
    type: actionTypes.RESULT_SCROLL_DATA_SUCCESS,
    preference: 'SCROLL',
    data
  }
}

export function searchData(data) {
  let trackingData = { type: actionTypes.SEARCH_DATA_SUCCESS, payload: data }
  analytics(trackingData)
  return {
    type: actionTypes.SEARCH_DATA_SUCCESS,
    data
  }
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  }
}
