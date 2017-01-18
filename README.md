# devStore

## Introduction
devStore is a mini app store that shows a list of the uploaded app versions, date uploaded, release notes and the download urls. It's meant to serve as a temporary/private store before you upload your apps to their respective official app stores (Google Play Store, App Store)

## Project Structure
`api/v1` => All the API scripts

`bin/www` => Entry point of the app

`config.js` => Configuration file to set app mode (dev or prod)

`data` => Schemas and MongoDB models

`data/constants.js` => Contains important and frequently used constants e.g connection strings, urls etc

`routes` => Manage all url routes

`views` => Jade views

## To install/run

1. run `npm install`.
2. Change the mongoose connection strings and app urls in `data/constants.js` to yours.
3. Set the app's running mode (prod or dev) in `config.js`
4. run `node bin/www`.

## License
The contents of this repository are covered under the [MIT License](https://github.com/biodunalfet/devStore/blob/master/LICENSE)

(in progress)