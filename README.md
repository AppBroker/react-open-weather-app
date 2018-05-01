# Open Weather App (SSR React/Redux/Saga and Node)
A very simple app that allows users to get weather information based on a city of choice. Also demonstrates simple GET process from the open weather api. Built using React, Redux/Redux Saga, Next JS (server side rendering) and Node.js, using webpack and babel for the scaffolding. Testing and coverage in Jest and Enzyme, more complex automated ui tests in Puppeteer using Chrome Headless and api testing with supertest.

## Getting Started
Download the app:

`git clone https://github.com/AppBroker/react-open-weather-app`  
`cd react-open-weather-app`

## Starting the app
Install the app (if you've already installed and intend on installing the latest version Id reccomend doing a clean install, as a few libraries have changed)

(make sure you have the latest versions of Node/NPM to run)

`npm install`


Build


`npm run build`


Run Locally (development)


`npm run dev`


Go to http://localhost:3000 to view the open weather app. Alternatively you can view a [demo](http://open-weather-app.eu-gb.mybluemix.net) here

## Testing the app
Run the tests:
I've set up 2 seperate test scripts, one for basic tests which run a bit faster and one for automated ui tests which take slightly longer, in the future id likely split them into unit/integration/quick ui/automated ui

`npm run test` 		//this will run the basic tests

and 

`npm run test-automation` 		//this will launch puppeteer and do some heavier ui automated tests

## Thoughts and todo list
Tests - I did a bit of refactoring on the reducer and for simplicity of the setup of the rig vs the time involved I ported over the old tests from Mocha into Jest, I also created some new tests mostly around the view components ( WeatherCard and Index page ). I decided to use Puppeteer to automate the UI testing of a search result being applied (populating the search input and submitting the search...and ultimately checking results are loaded). I decided to split the Automated tests away from the smaller tests I was running as described in the commands above, so these tests are run seperately now.

## Test Suites In Following Locations:
`__tests__/index.automation.js`  
`__tests__/index.test.js`  
`api/__tests__/api.integration.js`  
`components/__tests__/weathercard.test.js`  
`sagas/__tests__/saga.test.js`  
