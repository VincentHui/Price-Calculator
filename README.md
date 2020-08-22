# Price Calculator

This repo contains folders for both the backend and frontend logic. The frontend is a `create-react-app` application that uses `styled-components` for css in js and axios to make http requests to the backend. The frontend takes in user input to calculate and display a price breakdown. The backend is a node js express application which uses axios to access [postcodes.io](https://postcodes.io/) and returns the shipping charge for a certain postcode. 

For both directories use `yarn install` to get the needed packages and then `yarn start` to start the applications and `yarn test` to run tests. When starting the frontend application make sure that the backend is started first or it will not work (this goes with its tests as well) 
