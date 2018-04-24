import { all, put, takeLatest, call } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import getWeatherApi from '../api/'
import { actionTypes, failure, resultData } from '../actions/actions'

es6promise.polyfill()

export function *loadResultDataSaga(action) {
  try {
    const response = yield call(getWeatherApi, action.data.searchTerm)
    yield put(resultData(response.data))
  } catch (err) {
    yield put(failure(err))
  }
}

function *rootSaga() {
  yield all([
    takeLatest(actionTypes.LOAD_RESULT_DATA, loadResultDataSaga)
  ])
}

export default rootSaga
