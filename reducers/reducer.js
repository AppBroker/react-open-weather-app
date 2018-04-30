import { actionTypes } from '../actions/actions'
import moment from 'moment'
import { Config } from '../config.js'
import { chain, last, toPairs, maxBy, get, groupBy } from 'lodash'
import { map } from 'lodash/fp'

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

const allPatterns = map(
  (pattern) => {
    const dayDT = pattern.dt_txt.split(' ')
    return {
      ...pattern,
      ...{ dt_txt_pureday: dayDT[0], dt_txt_purehour: dayDT[1] }
    }
  })

export const arrangePatternsByDays = (data) => {
  const list = [...data]
  return groupBy(allPatterns(list), 'dt_txt_pureday')
}

export const getDaysData = (data) => {
  return Object.keys(data).map((day, index)=>{
    const currentWeather = { ...data[day][0].weather[0] }
    const currentMain = { ...data[day][0].main }
    const currentWeatherIcon = `${Config.weatherApiIconsUrl}${currentWeather.icon}.png`
    const currentWeatherDescription = currentWeather.description
    const currentTemp = Math.round(currentMain.temp)
    const dayName = index > 1 ? appInitialState.weekDays[moment(day).day()] : appInitialState.nowNextDays[index]
    // Mostly description
    const mostlyDescription = getHighestOccurringPattern(data[day], 'description')
    // Mostly main weather
    const withWeather = getHighestOccurringPattern(data[day], 'main')
    // Mostly icon
    const icon = getHighestOccurringPattern(data[day], 'icon')
    // Average temperature
    const avgTemp = getAverageFromPattern(data[day], 'main', 'temp')
    // Average windspeed
    const windDirection = getAverageFromPattern(data[day], 'wind', 'deg')

    return { dayName, patternsInDay: [ ...data[day] ], mostlyDescription, withWeather,
      icon, avgTemp, windDirection, currentWeather, currentWeatherIcon, currentWeatherDescription, currentTemp
    }
  })
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

  case actionTypes.SEARCH_TERM_CHANGE:
    return {
      ...state,
      ...{ searchTerm: action.data.searchTerm, preference: action.data.preference }
    }

  case actionTypes.RESULT_DATA_SUCCESS:
    const patternsInDays = arrangePatternsByDays(action.data.list)
    const daysData = getDaysData(patternsInDays)

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
