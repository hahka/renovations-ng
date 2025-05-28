import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private readonly location: Location) {}

  back(): void {
    this.location.back();
  }
}
