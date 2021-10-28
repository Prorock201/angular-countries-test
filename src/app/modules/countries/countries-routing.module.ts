import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryComponent } from './components/country/country.component';
import { FavouriteComponent } from './components/favourite/favourite.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  },
  {
    path: 'favourite',
    component: FavouriteComponent,
  },
  {
    path: ':id',
    component: CountryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
