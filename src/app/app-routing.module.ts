import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './modules/countries/components/country-list/country-list.component';
import { CountryComponent } from './modules/countries/components/country/country.component';
import { FavouriteComponent } from './modules/countries/components/favourite/favourite.component';
import { CountriesModule } from './modules/countries/countries.module';

const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./modules/countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: '**',
    redirectTo: '/countries',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
