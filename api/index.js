import { Config } from '../config'
import axios from 'axios'

const getWeatherApi = (searchTerm) => {
  return axios.get(`${Config.weatherApiUrl}?appid=${Config.weatherAPIKey}&q=${searchTerm}&units=metric`)
}

export default getWeatherApi
