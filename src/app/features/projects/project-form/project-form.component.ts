import { AsyncPipe, Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DetailComponent } from '../../../shared/components/detail/detail.component';
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
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-project-form',
  imports: [
    ApiObsHelperComponent,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    MatInputModule,
    TranslatePipe,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatDatepickerModule,
    MatDialogModule,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent extends DetailComponent<Project> {
  override newData(): Project {
    console.log('new Data');
    return new Project();
  }
  override getFormattedData(): Project {
    return new Project(this.form.value);
  }

  constructor(
    public formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    projectsService: ProjectsService,
    location: Location,
    router: Router,
  ) {
    super(activatedRoute, projectsService, location, router);

    this.form = this.formBuilder.group({
      id: [''],
      label: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }
}
