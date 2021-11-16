import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { City, Country } from '../models/countries.model';
import { HttpService } from '../../core/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class CountryService {

    constructor(private httpService: HttpService) { }

    async getAllCountries(): Promise<Array<Country>> {
        const response = await this.httpService.get(`${environment.apiBaseUrl}/country-state-city`);
        if (!response.data) {
            throw new Error('Countries not found');
        }
        return response.data.map((d: any) => {
            const country = new Country();

            country.isoCode = d.isoCode;
            country.name = d.name;
            country.phonecode = d.phonecode;
            country.flag = d.flag;
            country.currency = d.currency;
            country.latitude = d.latitude;
            country.longitude = d.longitude;
            country.timezones = d.timezones;

            return country;
        });
    }

    async getCitiesOfCountry(countryCode: string): Promise<Array<City>> {
        const response = await this.httpService.get(`${environment.apiBaseUrl}/country-state-city/${countryCode}/City`);
        if (!response.data) {
            throw new Error('Countries not found');
        }
        return response.data.map((d: any) => {
            const city = new City();

            city.name = d.name;
            city.countryCode = d.countryCode;
            city.stateCode = d.stateCode;
            city.latitude = d.latitude;
            city.longitude = d.longitude;

            return city;
        });
    }
}