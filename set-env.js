const fs = require('fs');

const devEnvPath = './src/environments/environment.ts';
const prodEnvPath = './src/environments/environment.prod.ts';
const key = process.argv[2] ? `'${process.argv[2]}'` : null;

const envConfigFile = `export const environment = {
  production: false,
  apiKeys: {
    openWeatherApiKey: ${key},
  },
  restApi: {
    openWeatherMap: 'https://api.openweathermap.org',
  }
};
`;

fs.writeFile(devEnvPath, envConfigFile,  (error) => {
  error ? console.error(err) : console.log('API Key successfully added to environment.ts');
});
fs.writeFile(prodEnvPath, envConfigFile,  (error) => {
  error ? console.error(err) : console.log('API Key successfully added to environment.prod.ts');
});
