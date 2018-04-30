/* eslint-env jest */
import expect from 'expect.js'
import getWeatherApi from '../../api/'
import sagaHelper from '../sagaHelper'
import { call } from 'redux-saga/effects'
import { loadResultDataSaga } from '../sagas'

const loadResultsAction = { type: 'LOAD_RESULT_DATA', data: { searchTerm: 'London', preference: 'weather', hasSearched: true } }

describe('Test: The load saga is working', () => {
  const it = sagaHelper(loadResultDataSaga(loadResultsAction))

  it('It triggers an action to load the api', result => {
    expect(result).to.eql(call(getWeatherApi, 'London'))
    expect(getWeatherApi.called).not.to.be(true)
  })
})
