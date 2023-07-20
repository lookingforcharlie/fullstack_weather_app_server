# Meteo Weather App

- Full Stack: Next.JS, TypeScript, Node.JS/Express.JS, MongoDB
- Client Side is hosted on Netlify
- Server Side is hosted on Railway

## Instruction for Running the App Locally

- git clone both [Client Side](https://github.com/lookingforcharlie/fullstack_weather_app_client) and [Server Side](https://github.com/lookingforcharlie/fullstack_weather_app_server)
- run 'npm install' in both Client Side and Server Side
- In Client Side, You could open src/app/config.ts file, switch API_URL to localhost
- npm run dev for both Client Side and Server Side

## WDID

### Backend

- Build endpoint for getting current weather
- geoData[0].city will correct the typo for the city name
- Build endpoint for getting last 5-day historical temperature
- Build endpoint for saving time and temperature in MongoDB
- Build endpoint for retrieving 5 items from MongoDB

## Expected Update

- [ ] Modify the post request to get request in Node
- [x] Fix show current temperature city name bug
