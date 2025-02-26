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
import { Project } from '../../../shared/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../../core/services/api/projects.service';
import { MatDivider } from '@angular/material/divider';
import { AbstractInformationComponent } from '../../../shared/components/abstract-information/abstract-information.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { tap } from 'rxjs';
import { WorkFormComponent } from '../../works/work-form/work-form.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent extends AbstractInformationComponent<Project> {
  override edit(data: Project): void {
    this.matDialog
      .open(ProjectFormComponent, { data })
      .beforeClosed()
      .pipe(tap(() => this.refresh.next(data.id as string)))
      .subscribe();
  }

  constructor(
    public matDialog: MatDialog,
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

  openWorkCreationDialog(dataId: string) {
    this.matDialog
      .open(WorkFormComponent, { data: { parentProject: { id: dataId } } })
      .beforeClosed()
      .pipe(tap(() => this.refresh.next(dataId)))
      .subscribe();
  }
}
