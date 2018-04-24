import React, { Component } from 'react'
import moment from 'moment'
import { Config } from '../config.js'

class WeatherCard extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
      	{this.props.isCurrentDay &&
      	  <div>
        	<img className='current-day_img' src={this.props.day.currentWeatherIcon} />
        	<h2>Currently {this.props.day.currentTemp}°C with {this.props.day.currentWeatherDescription}</h2>
	        <p> For the majority of this day you will experience {this.props.day.mostlyDescription}.
	          <img className='majority-day_img' src={`${Config.weatherApiIconsUrl}${this.props.day.icon}.png`} />
	        </p>
          </div>
    	}

       	{!this.props.isCurrentDay &&
      	  <div>
        	<img className='current-day_img' src={`${Config.weatherApiIconsUrl}${this.props.day.icon}.png`} />
        	<h2>Expect mostly {this.props.day.avgTemp}°C temperature with {this.props.day.mostlyDescription}</h2>
          </div>
    	}
        <p>
        Furthermore for most of the day the wind will be blowing in this direction <img src={Config.weatherArrowImageUrl}
            style={{ transform: `rotate(${this.props.day.windDirection}deg)` }} className='majority-day_img arrow-grid' />
        </p>
        <h2>Detailed weather information:</h2>
        {
          this.props.day.patternsInDay.map((pattern, index) => {
            const patternTime = moment.utc(pattern.dt_txt)
            const clockTime = patternTime.format('h:mm:ss a')
            const windDeg = pattern.wind.deg
            // Meters per second to miles per hour
            const windSpeed = Math.round(pattern.wind.speed * 2.23694)
            const patternImg = pattern.weather[0].icon
            const patternWeatherDescription = pattern.weather[0].description
            const patternTemp = Math.round(pattern.main.temp)
            return (
              <div key={index}>
                <p><span className='enhance'>{clockTime}</span></p>
                Wind: <img src={Config.weatherArrowImageUrl}
                  style={{ transform: `rotate(${windDeg}deg)` }} className='majority-day_img arrow-grid' /> @
                { windSpeed }MPH
                <br/>
                Weather: { patternWeatherDescription }
                <img className='majority-day_img' src={`${Config.weatherApiIconsUrl}${patternImg}.png`} />
                <br/>
                Temperature: { patternTemp }°C
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default WeatherCard
