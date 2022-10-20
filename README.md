This is a weather app that loads data from openweathermap.org and allows the user to create a list of locations to track their weather.

The app is written mostly in Typescript and build in React over next.js using Redux as state management. Styling is done by using styled-components.
Data is presisted using redux-presist which maintains the same state between page loads, reloads and across multiple sessions.   
The app also displays a 3-hour Forecast for 5 days. The app could present daily forecast but that api is a paid one.

## Getting Started

After cloning the project install the node_modules using yarn:

```bash
yarn install
```

Then you can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

To run the tests you can run:

```bash
yarn test
```

## Config

The app comes with a free openweathermap.org api key, if it no longer works please setup one and replace openWeatherMapApiKey on config.ts with it.