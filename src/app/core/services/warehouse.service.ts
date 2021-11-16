import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private httpService: HttpService) {}

  async getWarehouses(): Promise<Array<any>> {
    const response = await this.httpService.get(
      `${environment.apiBaseUrl}/warehouses`
    );
    if (!response.data) {
      throw new Error('Warehouses not found');
    }
    return response.data;
  }

  async getWarehouseTypes(): Promise<Array<any>> {
    const response = await this.httpService.get(
      `${environment.apiBaseUrl}/warehouse-types`
    );
    if (!response.data) {
      throw new Error('Warehouse Types not found');
    }
    return response.data;
  }
}
