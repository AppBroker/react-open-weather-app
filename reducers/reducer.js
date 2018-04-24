import { actionTypes } from '../actions/actions'
import moment from 'moment'
import { Config } from '../config.js'
import { groupBy, chain, last, toPairs, maxBy, get } from 'lodash'

export const appInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  placeholderData: null,
  resultData: null,
  daysData: null,
  lastPreference: null,
  slideIndex: 0,
  isLoading: false,
  hasSearched: false,
  searchTerm: '',
  totalData: [],
  isLoadingXHR: false,
  totalCount: 0,
  weekDays: ['Sun', 'Mon', 'Tue', 'Weds', 'Thurs', 'Fri', 'Sat'],
  nowNextDays: ['2Day', '2Mor'],
  totalLoadedCount: 0,
  searchData: null
}

export const getHighestOccurringPattern = (data, patternkey) => {
  const patternSpread = [...data]
  return chain(patternSpread.map((pattern) => {
    return pattern.weather[0][patternkey]
  })).countBy().toPairs().maxBy(last).head().value()
}

export const getAverageFromPattern = (data, typekey, patternkey) => {
  const patternSpread = [...data]
  return Math.round(patternSpread.map((pattern) => {
    return parseInt(get(pattern, `${typekey}.${patternkey}`), 10)
  }).reduce((a, b) => {
    return a + b
  }) / patternSpread.length)
}

export const arrangePatternsByDays = (data) => {
  const list = [...data]
  return groupBy(
    list.map(
      (pattern) => {
        const dayDT = pattern.dt_txt.split(' ')
        return {
          ...pattern,
          ...{ dt_txt_pureday: dayDT[0], dt_txt_purehour: dayDT[1] }
        }
      }), 'dt_txt_pureday')
}

const reducer = (state = appInitialState, action) => {
  switch (action.type) {
  case actionTypes.FAILURE:
    return {
      ...state,
      ...{ error: action.error }
    }

  case actionTypes.LOAD_RESULT_DATA:
    return {
      ...state,
      ...{ hasSearched: true, isLoadingXHR: true }
    }

  case actionTypes.RESULT_DATA_SUCCESS:
    const patternsInDays = arrangePatternsByDays(action.data.list)

    const daysData = Object.keys(patternsInDays).map((day, index)=>{
      const currentWeather = { ...patternsInDays[day][0].weather[0] }
      const currentMain = { ...patternsInDays[day][0].main }
      const currentWeatherIcon = `${Config.weatherApiIconsUrl}${currentWeather.icon}.png`
      const currentWeatherDescription = currentWeather.description
      const currentTemp = Math.round(currentMain.temp)
      const dayName = index > 1 ? state.weekDays[moment(day).day()] : state.nowNextDays[index]
      // Mostly description
      const mostlyDescription = getHighestOccurringPattern(patternsInDays[day], 'description')
      // Mostly main weather
      const withWeather = getHighestOccurringPattern(patternsInDays[day], 'main')
      // Mostly icon
      const icon = getHighestOccurringPattern(patternsInDays[day], 'icon')
      // Average temperature
      const avgTemp = getAverageFromPattern(patternsInDays[day], 'main', 'temp')
      // Average windspeed
      const windDirection = getAverageFromPattern(patternsInDays[day], 'wind', 'deg')

      return { dayName, patternsInDay: [ ...patternsInDays[day] ], mostlyDescription, withWeather,
        icon, avgTemp, windDirection, currentWeather, currentWeatherIcon, currentWeatherDescription, currentTemp
      }
    })

    return {
      ...state,
      ...{ resultData: action.data.list, daysData,
        preference: action.preference, searchTerm: action.data.searchTerm,
        hasSearched: true, isLoadingXHR: false
      }
    }

  default:
    return state
  }
}

export default reducer
