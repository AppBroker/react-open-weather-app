/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import WeatherCard from '../WeatherCard'
import { arrangePatternsByDays, getDaysData } from '../../reducers/reducer'
import { list }  from '../../__mocks__/api-data.json'

let weatherData = arrangePatternsByDays(list)
let daysData = getDaysData(weatherData)

describe('Test: Weather Card', () => {
  it('Should Render Current for Current Day', () => {
    const card = shallow(<WeatherCard day={daysData[0]} isCurrentDay={true} />)
    expect(card.find('h2').first().text()).toContain('Currently')
  })

  it('Should render Expect for upcoming days', () => {
    const card = shallow(<WeatherCard day={daysData[1]} />)
    expect(card.find('h2').first().text()).toContain('Expect')
    const nextCard = shallow(<WeatherCard day={daysData[2]} />)
    expect(nextCard.find('h2').first().text()).toContain('Expect')
  })

  it('Should render at least 1 weather slot for todays weather ', () => {
    const card = shallow(<WeatherCard day={daysData[0]}/>)
    expect(card.find('.weather-item_3hr').length).toBeGreaterThan(0)
  })

  it('Should render 8 sections of weather for the following day based on 3hr slots over 24hrs', () => {
    const card = shallow(<WeatherCard day={daysData[1]}/>)
    expect(card.find('.weather-item_3hr').length).toBe(8)
  })
})
