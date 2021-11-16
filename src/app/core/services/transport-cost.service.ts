import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TransportCostService {
  constructor(private httpService: HttpService) {}

  async getTransportCosts(
    warehouseTypeId?: any,
    warehouseId?: any,
    locationId?: any
  ): Promise<Array<any>> {
    let queryParams = '';

    if (warehouseTypeId) {
      queryParams = `${queryParams}warehouse_type_id=${warehouseTypeId}`;
    }

    if (warehouseId) {
      if (queryParams) {
        queryParams = `${queryParams}&warehouse_id=${warehouseId}`;
      } else {
        queryParams = `${queryParams}warehouse_id=${warehouseId}`;
      }
    }

    if (locationId) {
      if (queryParams) {
        queryParams = `${queryParams}&location_id=${locationId}`;
      } else {
        queryParams = `${queryParams}location_id=${locationId}`;
      }
    }

    const response = await this.httpService.get(
      `${environment.apiBaseUrl}/transport-costs?${queryParams}`
    );
    if (!response.data) {
      throw new Error('Warehouses not found');
    }
    return response.data;
  }

  async putTransportCosts(row?: any): Promise<Array<any>> {
    const response = await this.httpService.put(
      `${environment.apiBaseUrl}/transport-costs`,
      row
    );
    if (!response.data) {
      throw new Error('Warehouses not found');
    }
    return response.data;
  }
}
