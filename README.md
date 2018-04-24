# Open Weather App (SSR React/Redux/Saga and Node)
A very simple app that allows users to get weather information based on a city of choice. Also demonstrates simple GET process from the open weather api. Built using React, Redux/Redux Saga, Next JS (server side rendering) and Node.js, using webpack and babel for the scaffolding. Testing in jest, karma, api testing with supertest.

## Getting Started
Download the app:

git clone https://github.com/AppBroker/open-weather-app
cd open-weather-app


## Testing the app
Run the tests:

npm run test


## Starting the app
Install the app

(make sure you have the latest versions of Node/NPM to run)

npm install


Build


npm run build


Run Locally


npm run dev


Go to http://localhost:3000 to view the open weather app. Alternatively you can view a [demo](http://open-weather-app.eu-gb.mybluemix.net) here

## Thoughts and todo list
Clean up - I built a project recently which had the basic shell structure with most of what the weather app needed, so I was able to get this all running really quickly, so I got to spend more time working on the app features, downside is there might be a few other random methods and existing files that I might have missed which might appear to not have much to do with the app.

Autosuggest - I downloaded the open weather api I saw they had a downloadable city list.json file, I was going to ingest this into my elastic search db and run an api to populate a drop down with autosuggest features for city selection, however I then saw it has over a million lines and likely over 300,000 records which would require a payment tier change on my elastic hosting, I am obviously too cheap for this:) so I decided to look at streaming the file in through node but the performance wasnt great so I figured id leave it for now.

Switches to switch between farenheit, celsius, metric, imperial etc - id set these up with their own actions and have them dynamically update the redux app state on switch.

Loading Indicators - perhaps some basic elements to indicate the app is fetching something

Swipe Indicators - on a mobile device you can swipe between days, its not immediately obvious, so an initial swipe hint

Enter Submit - hitting enter should submit the weather search, no brainer, yet ive not implemented it as part of form element, so I'd likely do that too.

Tests - There are a couple tests that cover the end2end testing on the third party api and one on the redux-saga ive set up. For now I've written an end to end test to make sure that if the data structure changes to the way I am filtering the results we will be able to determine from running the tests. Coverage is nowhere near where it could be, ive skipped UI unit tests for the sake of brevity...istanbul will create a folder called coverage in the root to show the coverage to prove this fact.

Refactor - After initial load I'm splitting the returned weather pattern data up by filtering on the day_txt key then applying the patterns into their respective days from there and applying the keys into the object as the pure day date. I'm sure I could think of plenty of other ways to do this, but it was working so decided to leave it for now and get on with some other features, regarding that point - I've written an end to end test to make sure that if the data structure changes to the way I am filtering the results in the reducer method arrangePatternsByDays we will be able to determine any issues by running the tests.

Ending comments - The app runs really fast, and is optimised over 90% on google page analyser for both web and mobile. I've set up the nodejs server.js with the basic requirements for this.
I really enjoyed this bit of work, I've made it modular so I might even enhancing it and use it on some of my own products. Definitely spent more than 4 hours on it, ~1.5 hours per day spread over 4 days.