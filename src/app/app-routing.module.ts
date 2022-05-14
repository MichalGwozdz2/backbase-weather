import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'weather',
    loadChildren: () => import('./views/weather/weather.module').then(module => module.WeatherModule)
  },
  {
    path: '**',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
