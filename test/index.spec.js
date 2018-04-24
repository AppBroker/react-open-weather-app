import { Config } from '../config'
import supertest from 'supertest'
import sagaHelper from '../main'
import { call } from 'redux-saga/effects'
import expect from 'expect.js'
import getWeatherApi from '../api/'
import moment from 'moment'
import { loadResultDataSaga } from '../sagas/sagas'

const loadResultsAction = { type: 'LOAD_RESULT_DATA', data: { searchTerm: 'London', preference: 'weather', hasSearched: true } }
let request = supertest(`${Config.weatherApiUrl}?appid=${Config.weatherAPIKey}&q=london&units=metric`)

describe('Test that the load saga is working', () => {
  const it = sagaHelper(loadResultDataSaga(loadResultsAction))

  it('It triggers an action to load the api', result => {
    expect(result).to.eql(call(getWeatherApi, 'London'))
    expect(getWeatherApi.called).not.to.be(true)
  })
})

//See test notes in README
describe('Test that the 3rd party weather api is working', () => {
  it('should return data successfully in the expected format for our front end', done => {
    request
      .get('/')
      .expect(200)
      .expect(res => {
        //See test notes in README
        expect(moment(res.body.list[0].dt_txt.split(' ')[0], 'YYYY-MM-DD',true).isValid()).to.eql(true)
      })
      .end(done)
  })
})
