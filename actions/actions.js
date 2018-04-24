export const actionTypes = {
  FAILURE: 'FAILURE',
  RESULT_DATA_SUCCESS: 'RESULT_DATA_SUCCESS',
  LOAD_RESULT_DATA: 'LOAD_RESULT_DATA',
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  }
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
