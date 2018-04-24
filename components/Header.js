import React, { Component } from 'react'
import Head from 'next/head'
import stylesheet from '../src/styles/style.scss'

class Header extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Head>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <meta name='description' content='Weather application based on Open Weather API'/>
          <meta charSet='utf-8' />
          <meta property='og:locale' content='en_GB' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Open Weather App' />
          <meta property='og:description' content='Weather application based on Open Weather API' />
          <meta property='og:url' content='http://open-weather-app.eu-gb.mybluemix.net' />
          <meta property='og:site_name' content='Show Me Deals' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:description' content='Open Weather App' />
          <meta name='twitter:title' content='Open Weather App' />
          <title>
           Open Weather App
          </title>
        </Head>
      </div>
    )
  }
}

export default Header
