import Layout from '../components/Layout.js'
import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import PageWrapper from '../components/PageWrapper.js'
import { Config } from '../config.js'
import Tabs, { Tab } from 'material-ui/Tabs'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SwipeableViews from 'react-swipeable-views'
import TextFieldSubmit from '../forms/TextFieldSubmit'
import WeatherCard from '../components/WeatherCard'
import { withReduxSaga } from '../store/store'
import { connect } from 'react-redux'

const styles = {
  root: {
    backgroundColor: '#333',
    position: 'fixed',
    top: 70,
    right: 0,
    zIndex: 1000,
    width: '100%',
  },
  tabs: {
    backgroundColor: '#f1e9da',
  },
  slide: {
    minHeight: 100
  },
  slide1: {
    marginTop: 15,
    backgroundColor: '#f1e9da',
  },
  slide2: {
    marginTop: 15,
  },
  slide3: {
    marginTop: 15,
  },
}

class Index extends Component {
    state = {
      slideIndex: 0
    };

    handleChange = (value) => {
      this.setState({
        slideIndex: value,
      })
    };

    static async getInitialProps({ store, isServer }) {
      const initialState = store.getState()
      const pagesRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/pages?_embed`
      )
      const pages = await pagesRes.json()
      return { pages, isServer, ...initialState }
    }

    render() {
      return (
        <Layout>
          <h1>{this.props.pages[0].title.rendered}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.pages[0].content.rendered
            }}
          />
          <TextFieldSubmit/>
          {this.props.hasSearched && this.props.resultData &&
            <div>
              <MuiThemeProvider>
                <Tabs className='dashboard-tabs' value={this.state.slideIndex}
                  onChange={this.handleChange} >
                  <Tab value={0} label={this.props.daysData[0].dayName} buttonStyle={{ height: 38 }}
                    style={{ color: '#fff', fontWeight: 'bold' }} />
                  <Tab value={1} label={this.props.daysData[1].dayName} buttonStyle={{ height: 38 }}
                    style={{ color: '#fff', fontWeight: 'bold' }} />
                  <Tab value={2} label={this.props.daysData[2].dayName} buttonStyle={{ height: 38 }}
                    style={{ color: '#fff', fontWeight: 'bold' }} />
                  <Tab value={3} label={this.props.daysData[3].dayName} buttonStyle={{ height: 38 }}
                    style={{ color: '#fff', fontWeight: 'bold' }} />
                  <Tab value={4} label={this.props.daysData[4].dayName} buttonStyle={{ height: 38 }}
                    style={{ color: '#fff', fontWeight: 'bold' }} />
                </Tabs>
              </MuiThemeProvider>
              <SwipeableViews index={this.state.slideIndex}
                onChangeIndex={this.handleChange}>
                <div style={Object.assign({}, styles.slide, styles.slide1)}>
                  <WeatherCard day={ this.props.daysData[0] } isCurrentDay={true}/>
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide2)}>
                  <WeatherCard day={ this.props.daysData[1] }/>
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide3)}>
                  <WeatherCard day={ this.props.daysData[2] }/>
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide3)}>
                  <WeatherCard day={ this.props.daysData[3] }/>
                </div>
                <div style={Object.assign({}, styles.slide, styles.slide3)}>
                  <WeatherCard day={ this.props.daysData[4] }/>
                </div>
              </SwipeableViews>
            </div>
          }
        </Layout>
      )
    }
}

const mapStateToProps = ({ resultData, hasSearched, daysData }) => ({ resultData, hasSearched, daysData })
export default withReduxSaga(connect(mapStateToProps)(PageWrapper(Index)))
