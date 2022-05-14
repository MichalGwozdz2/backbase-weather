const fs = require('fs');

const devEnvPath = './src/environments/environment.ts';
const prodEnvPath = './src/environments/environment.prod.ts';
let key;

if (process.env.MY_API_KEY) {
  key = `'${process.env.MY_API_KEY}'`;
} else if (process.argv[2]) {
  key = `'${process.argv[2]}'`;
}

const envConfigFile = `export const environment = {
  production: false,
  apiKeys: {
    openWeatherApiKey: ${key},
  },
  restApi: {
    openWeatherMap: 'https://api.openweathermap.org',
    openWeatherImages: 'http://openweathermap.org'
  }
};
`;

fs.writeFile(devEnvPath, envConfigFile,  (error) => {
  error ? console.error(err) : console.log('API Key successfully added to environment.ts');
});
fs.writeFile(prodEnvPath, envConfigFile,  (error) => {
  error ? console.error(err) : console.log('API Key successfully added to environment.prod.ts');
});
