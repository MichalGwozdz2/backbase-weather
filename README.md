# BackbaseWeatherExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Purpose

The application allows showing a few widgets that contain info like temperature, pressure, and wind speed for the biggest cities.
There can be found a detailed forecast for the next 12 hours - can be shown when the user clicked on the widget.

## API

Application uses OpenWeatherMap - https://openweathermap.org/

## How to start application (DEV MODE)

1. Download the project from Github
2. If you don't have a node, install it (I have v14.15.1, you can check it by using 'node --version' in the console)
3. Install dependencies (by **npm i**)
4. OPTIONAL: add API key in environment files - you can do it by **npm run config** {apiKey} (it's optional because, the application will ask about it later if you didn't do that step)
5. Start the project by npm **run start**
6. Open localhost:4200 in browser (default port, if it is already used, then info about different port should be printed on console)
7. OPTIONAL: to check tests use **npm run test**

## How to use application

1. If the programmer didn't specify Api Key, there should display the modal<br>
2. Initial view contains only filter bar, to move forward, you have to choose a few cities (min 1, max 5)
3. When user used search bar to get some data, then the widgets should appear 
4. When user clicked on widget then there should appear the last widget with forecast for next 12 hours
5. Application can be used in mobile view as well <br>

## Structure

The project contains one big view (including routing)
- WeatherComponent, which is responsible for downloading data, can be found in the views directory.

Under the WeatherComponent there are three components (each of them can be found in the components directory):
- WeatherFilterBar - is responsible for selecting cities and displaying the time of the last search;
- WeatherWidget - each selected city should appear as a separated widget wich some additional info;
- WeatherForecast - when the user clicked on the widget, there should appear a new widget below, which contains a forecast for the next 12 hours;

Users can see two modals:
- LoaderComponent - should be shown when the application downloads data;
- WeatherApiKey - is visible on init when you didn't specify openWeatherMap in the environment file;

Application has a few core services:
- EnvironmentService - allows access to ENV object;
- LoaderService - can be used to show/hide loader (it's just a spinner on grey background);
- RestApiService - wrapper for HttpClient;

And some specialised services:
- WeatherService - standard HTTP service for OpenWeather endpoints;
- WeatherApiKeyStore - store service (didn't want to use store lib here :P) for API Key - can be passed in environment file or manually in the application;
- WeatherCitiesStore - store for cities - OpenWeather shares a huge JSON file with all cities, so I decided to use just a few elements and cache it as a local JSON file;

There are two interceptors:
- ErrorInterceptor - catches every HTTP error and displays snack bar with info;
- WeatherApiKeyInterceptor - attach API key as a header to HTTP calls;

# Used Additional Libraries

COMPONENTS

@angular/material - well, it wasn't necessary but I didn't want to waste the time on common components

chart.js - I needed some cool tool for visualisation forecast :)

TRANSLATIONS

@ngx-translate/core - because it's good practice to use translations files instead of hardcoding

@ngx-translate/http-loader

STYLES

tailwindcss - bootstrap is much heavier, I know - boilerplate, but this project is small, in the huge project, I would separate and wrap common styles to avoid repeating

autoprefixer

postcss

TESTS

ng-mocks - pretty good tool that helps create true unit tests (each outer component is mocked out)
