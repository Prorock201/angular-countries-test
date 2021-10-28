import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { CountryDTO } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements AfterViewInit {
  public loading: boolean = false;
  public countryList: CountryDTO[] =[];
  public displayedColumns: string[] = ['position', 'favourite', 'flag', 'name', 'region', 'subregion'];
  public dataSource: any = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private countriesService: CountriesService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.loading = true;
    this.countriesService.getFavouriteCountries();
    this.countriesService.getAllCountries();
    this.getCountries();
    this.cdRef.detectChanges();
  }

  getFavoriteIcon(isFavourite: boolean) {
    return isFavourite ? 'star' : 'star_border';
  }

  getFavouriteCountriesCount() {
    return this.countriesService.getFavouriteCountriesCount;
  }

  getCountries() {
    this.countriesService.countries
      .pipe(
        map((data: CountryDTO[]) => {
          return data.map(country => ({
            ...country,
            isFavourite: this.countriesService.isFavouriteCountry(country.ccn3),
          }))
        })
      )
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<CountryDTO>(data);
        this.dataSource.paginator = this.paginator;
        if (data.length > 0) {
          this.loading = false;
        }
      })
  }

  toogleFavouriteCountry(country: CountryDTO) {
    country.isFavourite = !country.isFavourite;
    if (this.countriesService.isFavouriteCountry(country.ccn3)) {
      this.countriesService.removeCountryFromFavourites(country.ccn3);
    } else {
      this.countriesService.addCountryToFavourites(country);
    }
  }

  applySearch(event: KeyboardEvent) {
    const search = (event.currentTarget as HTMLInputElement).value
    this.dataSource.filter = search.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToCountryInfo(country: CountryDTO) {
    if (country.ccn3) {
      this.router.navigate([`/countries/${country.ccn3}`]);
    }
  }
}
