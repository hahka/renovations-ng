import { Component } from '@angular/core';
import { AsyncPipe, Location, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BaseModel } from '../../../shared/models/api/base.model';
import { DetailComponent } from '../../../shared/components/detail/detail.component';
import { Project } from '../../../shared/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/api/projects.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-project-info',
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    PageHeaderComponent,
    MatInputModule,
    TranslatePipe,
    MatFormFieldModule,
    MatCard,
    MatDatepickerModule,
    NgFor,
    MatDivider,
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent extends DetailComponent<Project> {
  // TODO: remove after DetailComponent split
  override newData(): Project {
    throw new Error('Method not implemented.');
  }

  // TODO: remove after DetailComponent split
  override getFormattedData(): Project {
    throw new Error('Method not implemented.');
  }

  constructor(
    activatedRoute: ActivatedRoute,
    projectsService: ProjectsService,
    location: Location,
    router: Router,
  ) {
    super(activatedRoute, projectsService, location, router);
  }

  onRowClick(row: BaseModel): void {
    this.router.navigate(['works', row.id]);
  }
}
