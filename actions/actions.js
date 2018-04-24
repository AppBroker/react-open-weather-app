export const actionTypes = {
  FAILURE: 'FAILURE',
  RESULT_DATA_SUCCESS: 'RESULT_DATA_SUCCESS',
}

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export function resultData(data) {
  return {
    type: actionTypes.RESULT_DATA_SUCCESS,
    preference: 'SEARCH',
    data
  }
}
