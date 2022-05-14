import {Chart, ChartItem} from 'chart.js';
import {WeatherForecastHourly} from '../model/classes/weather/weather-forecast.model';

/**
 * Function returns configuration file for purple linear chart
 * @param nativeElement - anchor for chart
 * @param hourly - array with data, that will be visualised
 */
export const chartConfig = (nativeElement: ChartItem, hourly: WeatherForecastHourly[]) => {
  const purpleColor: string = '#d6bcfa';
  const purpleColorOpacity: string = 'rgba(214,188,250,.3)';

  return new Chart(nativeElement, {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      elements: {
        line: {
          borderJoinStyle: 'round',
          tension: .5
        }
      }
    },
    data: {
      labels: [...hourly.map((element: WeatherForecastHourly) => `${element.hour}:00`)],
      datasets: [
        {
          fill: true,
          backgroundColor: purpleColorOpacity,
          borderColor: purpleColor,
          pointBorderColor: purpleColor,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: purpleColor,
          pointHoverBorderColor: purpleColor,
          pointHoverBorderWidth: 4,
          pointRadius: 5,
          pointHitRadius: 10,
          data: [...hourly.map((element: WeatherForecastHourly) => element.temp)],
          spanGaps: false,
        }
      ]
    }
  });
}
