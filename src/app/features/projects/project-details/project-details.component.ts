import {AsyncPipe, Location, NgFor, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { DetailComponent } from '../../../shared/components/detail/detail.component';
import { Project } from '../../../shared/models/project.model';
import { ApiObsHelperComponent } from '../../../shared/components/api-obs-helper/api-obs-helper.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/api/projects.service';
import { PageHeaderComponent } from "../../../shared/components/page-header/page-header.component";
import { TranslatePipe } from '@ngx-translate/core';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {BaseModel} from "../../../shared/models/api/base.model";

@Component({
  selector: 'app-project-details',
  imports: [ApiObsHelperComponent, NgIf, AsyncPipe, ReactiveFormsModule, PageHeaderComponent, MatInputModule, TranslatePipe, MatFormFieldModule, MatLabel, MatError, MatCard, MatDatepickerModule, NgFor],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent extends DetailComponent<Project> {
  override newData(): Project {
    return new Project();
  }
  override getFormattedData(): Project {
    return new Project(this.form.value);
  }

  constructor(public formBuilder: FormBuilder, activatedRoute: ActivatedRoute, projectsService: ProjectsService, location: Location, router: Router) {
    super(activatedRoute, projectsService, location, router);

    this.form = this.formBuilder.group({
      id: [''],
      label: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }

  onRowClick(row: BaseModel): void {
    this.router.navigate(['works', row.id]);
  }
}
