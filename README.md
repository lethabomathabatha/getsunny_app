# Don't Get Caught in the Wind - GetSunny
GetSunny is a weather forecast web app that allows you to look up the city to  you are in and get accurate information back.

## Here's GetSunny's workflow:

- The user enters a location (e.g., Pretoria) in the app.

- The geolocation API (NeutrinoAPI) is used to convert the user's input into latitude and longitude coordinates.

- The obtained coordinates are taken and used as parameters to make requests to one of the Weather APIs (OpenWeatherMap).

- The Weather API will return weather data for that location, including current conditions, forecasts, and other relevant information.

- Display the weather data to the user in your app's user interface, providing details such as temperature, humidity, wind speed, and more.


## GetSunny is a React + TypeScript + Vite app
- use npm install + npm run dev to get it running


## Highlights 
- finding a way to utilise RSAWEB’s brand colours and gradient without being too overwhelming. The orange and red tones went through several iterations to reach an identifiable and useable interface palette 
- creating a simple intuitive interface with minimal interactions


## Hurdles
### Positionstack geolocation api: 
- https access denied for package, so http had to be utilised and have redirect{manual} appended to prevent browser conversion back to https
- unpredictable behaviour 

### Neutrino geolocation api
- required CORS resolution that became time-consuming


## Figma
https://www.figma.com/file/lBf4gBC6h9xbYubFrjit2S/GetSunny?type=design&node-id=0-1&mode=design&t=Zklhk9OUJOZljSvt-0

