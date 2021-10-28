import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDTO, CountryInfo } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public country?: CountryInfo = {} as CountryInfo;

  constructor(
    private route: ActivatedRoute,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.countriesService.getAllCountries();
    this.countriesService.countries
      .subscribe((countries: CountryDTO[]) => {
        const selectedCountry = countries.filter((country: CountryDTO) => country.ccn3 === countryId)[0];
        if (selectedCountry) {
          this.preparedCountryData(selectedCountry);
        }
      })
  }

  preparedCountryData(country: CountryDTO) {
    this.country = {
      name: country?.name?.official,
      region: country?.region,
      languages: Object.values(country?.languages).join(),
      capital: country?.capital?.length ? country?.capital[0] : '',
      flagUrl: country?.flags[0]
    }
  }
}
