import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api/api.service';
import { ApiObsHelperComponent } from '../api-obs-helper/api-obs-helper.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseModelImpls } from '../../../utils/types';
import { LocationService } from '../../../core/services/location.service';

@Component({
  template: '',
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
  ],
})
export abstract class DetailComponent<T extends BaseModelImpls>
  implements AfterViewInit
{
  /** ViewChild helping call the api via observables without subscriptions */
  @ViewChild(ApiObsHelperComponent, { static: true })
  apiObsHelper?: ApiObsHelperComponent<T>; // TODO: ? assertion

  /** Class that is used in consumer's components to apply some style for the administration */
  @HostBinding('class') consumerClass = 'admin__detail';

  /** Observable of the api call returning a resource */
  detail$?: Observable<T>;

  /** FormGroup patched by observables, used to display object information */
  form!: FormGroup; // TODO: ! assertion

  /** Wether the object is archived or not. Needs to be updated at GET/PATCH */
  isArchived = false;

  /** Observable of the object post/patch, called via async pipe if {loading === true} */
  loading$?: Observable<T>;

  /** BehaviorSubject used to refresh the data without subscription (only observable and asyncpipe) */
  refresh = new BehaviorSubject<string>('');

  /** Track all disabled field */
  disabledControls: string[] = [];

  constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly apiService: ApiService<T>,
    protected readonly locationService: LocationService,
    protected readonly router: Router,
  ) {}

  /**
   * @inheritdoc
   * Here we need to set the apiService for the apiObsHelper
   */
  ngAfterViewInit(): void {
    if (this.apiObsHelper) {
      this.apiObsHelper.apiService = this.apiService;
    }
  }

  /**
   * Handle api errors
   * @param httpError the http error
   */
  onHttpError(httpError: HttpErrorResponse): void {
    if (
      httpError.error &&
      httpError.error.code &&
      httpError.error.code.indexOf('DUP') > -1
    ) {
      // duplicated name
      if (this.form?.controls['name']) {
        // TODO ['name'] vs .name
        this.form.controls['name'].setErrors({ duplicated: true });
      }
    }
  }
}
