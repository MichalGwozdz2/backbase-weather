const fs = require('fs');

const devEnvPath = './src/environments/environment.ts';
const prodEnvPath = './src/environments/environment.prod.ts';
let key;

console.log(process.env)

console.log(process.env.MY_API_KEY, 'x', process.env.API_KEY)

if (process.env.MY_API_KEY) {
  console.log('DETECTED SECRET', process.env.MY_API_KEY);
  key = `'${process.env.API_KEY}'`;
}

if (process.argv[2]) {
  console.log('DETECTED API KEY', process.argv[2]);
  key = `'${process.argv[2]}'`;
}

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
