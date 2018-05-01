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

/**
  *  Decides the highest occuring pattern
  *  @param {array} data - A list of all the weather patterns
  *  @param {key} patternkey - Second level key structure on api json
  *  @returns {String|Number} - The highest occuring pattern from the data
  */
export const getHighestOccurringPattern = (data, patternkey) => {
  const patternSpread = [...data]
  return chain(patternSpread.map((pattern) => {
    return pattern.weather[0][patternkey]
  })).countBy().toPairs().maxBy(last).head().value()
}

/**
  *  Works out the average from any number based patterns:
  *  @param {array} data - A list of all the weather patterns
  *  @param {key} typekey - Second level key structure on api json
  *  @param {key} patternkey - Final level key structure on api json
  *  @returns {Number} - The arage number for the desired type of data from the weather pattern
  */
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

/**
  *  Takes the json api data and group the list of weather patterns by day:
  *  @param {array} data - A list of all the weather patterns
  *  @returns {object} - An object with weather patterns grouped within their respective dates as keys in YYYY-MM-DD format
  */
export const arrangePatternsByDays = (data) => {
  const list = [...data]
  return groupBy(allPatterns(list), 'dt_txt_pureday')
}

/**
  *  Redistribute data for the day data populating each day with its respective weather patterns, given:
  *  @param {object} data - object
  *  @returns {object} - Addional Current information on the current day along with the weather patterns for that day
  */
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

/**
  *  Calculate the air density, given:
  *  @param {number} temp - temperature (celsius)
  *  @param {number} press - actual air pressure (millibars, i.e., hectopascals)
  *  @param {number} dew - dew point (celsius)
  *  @returns {number} - Air Density
  */
export const calculateRho = (temp, press, dew) => {
  const c0 = 0.99999683
  const c1 = -0.90826951E-02
  const c2 = 0.78736169E-04
  const c3 = -0.61117958E-06
  const c4 = 0.43884187E-08
  const c5 = -0.29883885E-10
  const c6 = 0.21874425E-12
  const c7 = -0.17892321E-14
  const c8 = 0.11112018E-16
  const c9 = -0.30994571E-19
  const p = c0 + dew * (c1 + dew * (c2 + dew * (c3 + dew * (c4 + dew * (c5 + dew * (c6 + dew * (c7 + dew * (c8 + dew * (c9)))))))))
  const psat_mbar = 6.1078 / (Math.pow(p, 8))

  // Step 2: calculate the vapor pressure.
  const pv_pascals = psat_mbar * 100.0

  // Step 3: calculate the pressure of dry air, given the vapor
  // pressure and actual pressure.
  const pd_pascals = (press * 100) - pv_pascals

  // Step 4: calculate the air density, using the equation for
  // the density of a mixture of dry air and water vapor.
  const density = (pd_pascals / (287.0531 * (temp + 273.15))) + (pv_pascals / (461.4964 * (temp + 273.15)))

  return density
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
