import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgAuthService } from '@appstrax/ng-auth';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { LocationService } from 'src/app/core/services/location.service';
import { TransportCostService } from 'src/app/core/services/transport-cost.service';
import { WarehouseService } from 'src/app/core/services/warehouse.service';

@Component({
  selector: 'app-transport-costs',
  templateUrl: './transport-costs.component.html',
  styleUrls: ['./transport-costs.component.scss'],
})
export class TransportCostsComponent implements OnInit {
  warehouseTypes: Array<any> = [];
  warehouses: Array<any> = [];
  locations: Array<any> = [];
  selectedWarehouseTypeId: any = null;
  selectedWarehouseId: any = null;
  selectedLocationId: any = null;

  editing: any = {};
  rows: any = [];

  ColumnMode = ColumnMode;

  updatedRow: any = null;

  user: any = null;

  constructor(
    private warehouseService: WarehouseService,
    private locationService: LocationService,
    private transportCostService: TransportCostService,
    private ngAuth: NgAuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.user = this.ngAuth.getAuthenticatedUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.warehouseTypes = (await this.warehouseService.getWarehouseTypes())
      .map((warehouseType: any) => {
        return {
          id: warehouseType.id,
          name: `${warehouseType.name} (${warehouseType.abbreviation})`,
          abbreviation: warehouseType.abbreviation,
        };
      })
      .sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

    this.warehouses = (await this.warehouseService.getWarehouses())
      .map((warehouse: any) => {
        return { id: warehouse.id, name: warehouse.name };
      })
      .sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

    this.locations = (await this.locationService.getLocations()).sort(function (
      a: any,
      b: any
    ) {
      return a.name.localeCompare(b.name);
    });

    this.refreshTransportCosts();
  }

  async refreshTransportCosts() {
    const transportCosts = await this.transportCostService.getTransportCosts(
      this.selectedWarehouseTypeId,
      this.selectedWarehouseId,
      this.selectedLocationId
    );
    this.rows = [...transportCosts];
  }

  warehouseTypeChange(warehouseType: any) {
    this.selectedWarehouseTypeId = warehouseType.id;
    this.refreshTransportCosts();
  }

  warehouseChange(warehouse: any) {
    this.selectedWarehouseId = warehouse.id;
    this.refreshTransportCosts();
  }

  locationChange(location: any) {
    this.selectedLocationId = location.id;
    this.refreshTransportCosts();
  }

  getWarehouseTypeById(id: any) {
    return this.warehouseTypes.find(
      (warehouseType: any) => warehouseType.id == id
    );
  }

  getWarehouseById(id: any) {
    return this.warehouses.find((warehouse: any) => warehouse.id == id);
  }

  getLocationById(id: any) {
    return this.locations.find((location: any) => location.id == id);
  }

  async updateValue(event: any, cell: any, rowIndex: any) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;

    await this.transportCostService.putTransportCosts(this.rows[rowIndex]);

    this.rows = [...this.rows];

    this.updatedRow = this.rows[rowIndex];
    setTimeout(() => {
      this.updatedRow = null;
    }, 2000);
  }
}
