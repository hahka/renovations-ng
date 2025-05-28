import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Project } from '../../../shared/models/project.model';
import { ApiObsHelperComponent } from '../../../shared/components/api-obs-helper/api-obs-helper.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/api/projects.service';
import { TranslatePipe } from '@ngx-translate/core';
import {
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AbstractFormComponent } from '../../../shared/components/abstract-form/abstract-form.component';
import { MatButton } from '@angular/material/button';
import { PageHeaderAction } from '../../../shared/components/page-header/page-header-action.enum';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-project-form',
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
    MatDialogModule,
    MatButton,
    TitleCasePipe,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent extends AbstractFormComponent<Project> {
  override infoPageBaseUrl = 'projects';

  override newData(): Project {
    return new Project();
  }

  override getFormattedData(): Project {
    return new Project(this.form.value);
  }

  createOrUpdate = 'create';
  detail: Project = this.newData();

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MatDialogRef) matDialogRef: MatDialogRef<Project>,
    @Inject(MAT_DIALOG_DATA) data: Project,
    activatedRoute: ActivatedRoute,
    projectsService: ProjectsService,
    locationService: LocationService,
    router: Router,
  ) {
    super(
      matDialogRef,
      activatedRoute,
      projectsService,
      locationService,
      router,
    );

    this.createOrUpdate = !!data?.id ? 'update' : 'create';
    this.form = this.formBuilder.group({
      id: [data?.id],
      label: [data?.label, Validators.required],
      startDate: [data?.startDate, Validators.required],
      endDate: [data?.endDate],
    });
  }

  protected readonly PageHeaderAction = PageHeaderAction;
}
