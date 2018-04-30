# Open Weather App (SSR React/Redux/Saga and Node)
A very simple app that allows users to get weather information based on a city of choice. Also demonstrates simple GET process from the open weather api. Built using React, Redux/Redux Saga, Next JS (server side rendering) and Node.js, using webpack and babel for the scaffolding. Testing and coverage in Jest, more complex automated ui tests in Puppeteer and api testing with supertest.

## Getting Started
Download the app:

git clone https://github.com/AppBroker/react-open-weather-app
cd react-open-weather-app

## Starting the app
Install the app

(make sure you have the latest versions of Node/NPM to run)

npm install


Build


npm run build


Run Locally


npm run dev


Go to http://localhost:3000 to view the open weather app. Alternatively you can view a [demo](http://open-weather-app.eu-gb.mybluemix.net) here

## Testing the app
Run the tests:
I've set up 2 seperate test scripts, one for basic tests which run a bit faster and one for automated ui tests which take slightly longer, in the future id likely split them into unit/integration/quick ui/automated ui

npm run test 		//this will run the basic tests

and 

npm run test-automation 		//this will launch puppeteer and do some heavier ui automated tests

## Thoughts and todo list
Clean up - I built a project recently which had the basic shell structure with most of what the weather app needed, so I was able to get this all running really quickly, so I got to spend more time working on the app features, downside is there might be a few other random methods and existing files that I might have missed which might appear to not have much to do with the app.

Autosuggest - I downloaded the open weather api I saw they had a downloadable city list.json file, I was going to ingest this into my elastic search db and run an api to populate a drop down with autosuggest features for city selection, however I then saw it has over a million lines and likely over 300,000 records which would require a payment tier change on my elastic hosting, I am obviously too cheap for this:) so I decided to look at streaming the file in through node but the performance wasnt great so I figured id leave it for now.

Switches to switch between farenheit, celsius, metric, imperial etc - id set these up with their own actions and have them dynamically update the redux app state on switch.

Loading Indicators - perhaps some basic elements to indicate the app is fetching something

React Components - I also would refactor the tabs component into a dynamic component that could built itself dependent on the number of days provided. It would require a better look at the UX for any more days especially on mobile.

CSS - The CSS needs a good cleanup too. There are a few hacky !importants in the css to override the tabs bar, ive not had time to dig into the component yet properly, just needed a quick way to get the tabs working and looking ok.

Swipe Indicators - on a mobile device you can swipe between days, its not immediately obvious, so an initial swipe hint

Enter Submit - hitting enter should submit the weather search, no brainer, yet ive not implemented it as part of form element, so I'd likely do that too.

Tests - I've done a bit of refactoring and ported over the old tests into Jest, and created some new tests mostly around the view components. I decided to use Puppeteer to automate the UI testing of a search result being applied (populating the search input and submitting the search...and ultimately checking results are loaded). I decided to split the Automated tests away from the smaller tests I was running as described in the commands above, so these tests can be run seperately, so you can probably see I'm thinking along in that direction, although its nowhere near to perfect yet. At the moment there is a top level __tests__ folder that is meant for the nextjs page tests. All other __tests__ folders are within their respective packages. The reason for this is purely to respect the nextjs page build process, as anything that is inside that folder nextjs will treat as a page, including any tests, ive spoken to a few of the other nextjs guys and they seem to think this is better than adding an ignore regex to the next config or something along those lines.

Refactor - After initial load I'm splitting the returned weather pattern data up by filtering on the day_txt key then applying the patterns into their respective days from there and applying the keys into the object as the pure day date. I'm sure I could think of plenty of other ways to do this, but it was working so decided to leave it for now and get on with some other features, regarding that point - I've written an end to end test to make sure that if the data structure changes to the way I am filtering the results in the reducer method arrangePatternsByDays we will be able to determine any issues by running the tests.

Ending comments - The app runs really fast, and is optimised over 90% on google page analyser for both web and mobile. I've set up the nodejs server.js with the basic requirements for this.
I really enjoyed this bit of work, I've made it modular so I might even enhancing it and use it on some of my own products. Definitely spent more than 4 hours on it, ~1.5 hours per day spread over 4 days.