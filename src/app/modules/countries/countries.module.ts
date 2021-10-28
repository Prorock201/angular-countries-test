import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryComponent } from './components/country/country.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { CountriesRoutingModule } from './countries-routing.module';

@NgModule({
  declarations: [
    CountryListComponent,
    CountryComponent,
    FavouriteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CountriesRoutingModule
  ],
  entryComponents: [CountryListComponent],
})
export class CountriesModule { }
