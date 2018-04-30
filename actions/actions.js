export const actionTypes = {
  FAILURE: 'FAILURE',
  RESULT_DATA_SUCCESS: 'RESULT_DATA_SUCCESS',
  SEARCH_TERM_CHANGE: 'SEARCH_TERM_CHANGE',
  LOAD_RESULT_DATA: 'LOAD_RESULT_DATA',
}

export const failure = (error) => {
  return {
    type: actionTypes.FAILURE,
    error
  }
}

export const loadResultData = (data) => {
  return {
    type: actionTypes.LOAD_RESULT_DATA,
    data
  }
}

export const searchFieldChanged = (data) => {
  return {
    type: actionTypes.SEARCH_TERM_CHANGE,
    data
  }
}

export const resultData = (data) => {
  return {
    type: actionTypes.RESULT_DATA_SUCCESS,
    preference: 'SEARCH',
    data
  }
}
