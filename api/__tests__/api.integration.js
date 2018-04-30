/* eslint-env jest */
import { Config } from '../../config'
import supertest from 'supertest'
import expect from 'expect.js'
import moment from 'moment'

let request = supertest(`${Config.weatherApiUrl}?appid=${Config.weatherAPIKey}&q=london&units=metric`)

describe('Integration: The 3rd party weather api is working', () => {
  it('should return data successfully in the expected format for our front end', done => {
    request
      .get('/')
      .expect(200)
      .expect(res => {
        expect(moment(res.body.list[0].dt_txt.split(' ')[0], 'YYYY-MM-DD', true).isValid()).to.eql(true)
      })
      .end(done)
  })
})
