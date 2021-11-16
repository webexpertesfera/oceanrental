import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  constructor(private httpService: HttpService) {}

  async getLocations(): Promise<Array<Location>> {
    const response = await this.httpService.get(`${environment.apiBaseUrl}/locations`);
    if (!response.data) {
      throw new Error('Locations not found');
    }
    return response.data.map((d: any) => {
      const location = new Location();
      location.id = d.id;
      location.cityArea = d.cityArea;
      location.cruisingArea = d.cruisingArea;
      location.name = d.name;
      location.timezone = d.timezone;
      return location;
    });
  }

  async getPopularMediterraneanPorts(
    locations: Array<Location>
  ): Promise<Array<Location>> {
    const popularLocationNames = [
      'Cannes',
      'Monaco',
      'Naples',
      'Porto Cervo',
      'Athens',
      'Split',
    ];

    return popularLocationNames.map((popularName: string, index: number) => {
      const exists = locations.find(
        (location: Location) => location.name === popularName
      );

      // Temp: return random location, should always be more than the 6 popular ones
      if (!exists) {
        return locations[index];
      }

      return exists;
    });
  }

  async getPopularCaribbeanPorts(
    locations: Array<Location>
  ): Promise<Array<Location>> {
    const popularLocationNames = [
      'Saint Maarten',
      'Antigua',
      'BVI',
      'USVI',
      'Nassau',
      'Fort Lauderdale',
    ];

    return popularLocationNames.map((popularName: string, index: number) => {
      const exists = locations.find(
        (location: Location) => location.name === popularName
      );

      // Temp: return random location, should always be more than the 6 popular ones
      if (!exists) {
        return locations[index];
      }

      return exists;
    });
  }
}
