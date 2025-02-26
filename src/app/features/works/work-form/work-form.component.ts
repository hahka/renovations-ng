import { Component, Inject, Signal } from '@angular/core';
import { Work } from '../../../shared/models/work.model';
import { ApiObsHelperComponent } from '../../../shared/components/api-obs-helper/api-obs-helper.component';
import { Location, NgIf, TitleCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from '../../../core/services/api/works.service';
import { AbstractFormComponent } from '../../../shared/components/abstract-form/abstract-form.component';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WorkTypesService } from '../../../core/services/api/work-types.service';
import { WorkType } from '../../../shared/models/work-type.model';
import { MatOption, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-work-form',
  imports: [
    ApiObsHelperComponent,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    TranslatePipe,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatDatepickerModule,
    MatDialogContent,
    MatButtonModule,
    TitleCasePipe,
    MatSelectModule,
    MatOption,
  ],
  templateUrl: './work-form.component.html',
  styleUrl: './work-form.component.scss',
})
export class WorkFormComponent extends AbstractFormComponent<Work> {
  override infoPageBaseUrl = 'works';

  override newData(): Work {
    return new Work();
  }

  override getFormattedData(): Work {
    return new Work(this.form.value);
  }

  createOrUpdate = 'create';
  detail: Work = this.newData();

  workTypes: Signal<WorkType[]>;

  constructor(
    public formBuilder: FormBuilder,
    public workTypesService: WorkTypesService,
    @Inject(MatDialogRef) matDialogRef: MatDialogRef<Work>,
    @Inject(MAT_DIALOG_DATA) data: Work,
    worksService: WorksService,
    activatedRoute: ActivatedRoute,
    location: Location,
    router: Router,
  ) {
    super(matDialogRef, activatedRoute, worksService, location, router);

    this.workTypes = workTypesService.workTypes;

    this.form = this.formBuilder.group({
      id: [''],
      label: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      parentProject: [{ id: data?.parentProject?.id }],
      workType: [{ id: data?.workType?.id }], // TODO: handle this via dialog
    });
  }
}
