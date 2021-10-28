import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { LoaderEnabled } from 'src/app/core/services/loader.service';
// import { LocalStorageService } from 'src/app/core/services/local-storage.service';
// import { CountriesApi } from '../constants/api.constants';
import * as COUNTRIES from '../constants/countries.constants';
import { CountryDTO } from '../models/country.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'src/app/core/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  countries = new BehaviorSubject<CountryDTO[]>([]);
  country = new BehaviorSubject<CountryDTO>({} as CountryDTO);
  favouriteCountries: Map<string, { country: CountryDTO }> = new Map();

  get getFavouriteCountriesCount() {
    return this.favouriteCountries.size;
  }

  getAllCountries(): void {
    this.http.get<CountryDTO[]>(`${environment.apiUrl}/all`).subscribe((data) => {
      this.countries.next(data);
    });
  }

  getCountryBtName(name: string): void {
    this.http.get<CountryDTO>(`${environment.apiUrl}/all/${name}`).subscribe((data) => {
      this.country.next(data);
    });
  }

  isFavouriteCountry(ccn3: string): boolean {
    return !!this.favouriteCountries.get(ccn3);
  }

  addCountryToFavourites(country: CountryDTO) {
    this.favouriteCountries.set(country.ccn3, { country });
    this.saveCountries();
  }

  removeCountryFromFavourites(ccn3: string) {
    this.favouriteCountries.delete(ccn3);
    this.saveCountries();
  }

  private saveCountries(): void {
    const itemsToSave: CountryDTO[] = [];
    this.favouriteCountries.forEach((value) => {
      itemsToSave.push(value.country);
    });
    this.localStorageService.setItem<CountryDTO[]>(COUNTRIES.FAVORITES, itemsToSave);
  }

  getFavouriteCountries() {
    const countries = this.localStorageService.getItem<CountryDTO[]>(COUNTRIES.FAVORITES);
    if (countries?.length) {
      const countryMap = new Map();
      countries.forEach((country) => {
        countryMap.set(country.ccn3, { country });
      });
      this.favouriteCountries = countryMap;
    }
  }
}
