import { Component, Inject } from '@angular/core';
import { BaseModelImpls } from '../../../utils/types';
import { DetailComponent } from '../detail/detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api/api.service';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: '',
  styleUrl: './abstract-form.component.scss',
})
export abstract class AbstractFormComponent<
  T extends BaseModelImpls,
> extends DetailComponent<T> {
  abstract infoPageBaseUrl: string;

  /** Needs to return a new object when form is in creation mode */
  abstract newData(): T;

  /** Returns the Object in the format used by the api. This function can be overridden in components when needed */
  abstract getFormattedData(): T;

  constructor(
    @Inject(MatDialogRef) public matDialogRef: MatDialogRef<any>,
    activatedRoute: ActivatedRoute,
    apiService: ApiService<T>,
    location: Location,
    router: Router,
  ) {
    super(activatedRoute, apiService, location, router);
  }

  /** Called on form submit, used to post/patch defect category */
  submit(): void {
    if (this.form && this.form.valid) {
      this.apiObsHelper?.postOrPatch(this.getFormattedData()); // TODO: ? assertion
    }
  }

  /** Enables the FormGroup. Can be overridden if FormGroup needs specific processing to be enabled */
  /*
  enable(): void {
    if (this.form) {
      this.form.enable();
      this.disabledControls.forEach((key: string) => {
        const control = this.form?.get(key); // TODO
        if (control) {
          control.disable();
        }
      });
    }
  }
  */

  /** Disables the FormGroup. Can be overridden if FormGroup needs specific processing to be disabled */
  /*
  disable(): void {
    if (this.form) {
      this.form.disable();
    }
  }
  */

  /** Needs to update this.isArchived and to patch the form and different FormControls/FormGroups */
  patchForm(data: T): void {
    this.form?.patchValue(data);
  }

  /**
   * Refreshes the page after update or creation
   * @param data The created/updated resource returned by the api
   */
  onPostedOrPatched(data?: T): void {
    if (data?.id) {
      console.log(this.router.url);
      console.log('data.id', data.id);
      this.router.navigate([this.infoPageBaseUrl, data.id], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
    this.matDialogRef.close();
    /* this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
    }); */
  }
}
