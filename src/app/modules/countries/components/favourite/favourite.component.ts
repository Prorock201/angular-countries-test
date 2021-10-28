import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CountryDTO } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements AfterViewInit {
  public loading: boolean = false;
  public countryList: CountryDTO[] =[];
  public displayedColumns: string[] = ['position', 'flag', 'name', 'region', 'subregion'];
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
    this.getFavouriteCountries();
    this.cdRef.detectChanges();
  }

  getFavouriteCountries() {
    const favouriteCountries = this.countriesService.favouriteCountries;
    const preparedCountryList = Array.from(favouriteCountries, ([name, value]) =>  value.country );
    this.dataSource = new MatTableDataSource<CountryDTO>(preparedCountryList);
    this.dataSource.paginator = this.paginator;
    this.loading = false;
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
