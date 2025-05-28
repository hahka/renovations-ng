import { Component } from '@angular/core';
import { AbstractListComponent } from '../../shared/components/abstract-list/abstract-list.component';
import { Project } from '../../shared/models/project.model';
import { ApiDataSource } from '../../shared/models/api/api-datasource.model';
import { FullColumn } from '../../shared/models/full-column.model';
import { ColumnType } from '../../shared/components/datatable/column-type.enum';
import { ProjectsService } from '../../core/services/api/projects.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DatatableComponent } from '../../shared/components/datatable/datatable.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, CommonModule, DatatableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent extends AbstractListComponent<Project> {
  dataSource: ApiDataSource<Project>;
  fullColumns: FullColumn<Project>[] = [
    {
      field: 'label',
      label: 'features.projects.label',
      type: ColumnType.string,
    },
  ];

  // TODO: used anymore?
  listPersistenceKey = 'projects';

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly dialog: MatDialog,
  ) {
    super(projectsService);
    this.dataSource = new ApiDataSource<Project>(
      (request, query) => {
        return this.projectsService.search(request, query);
      },
      {
        initialQuery: { search: '' },
        // TODO: verify order (which should correspond to date of creation) with api usage and not just fake data
        initialSort: { field: 'id', order: 'asc' },
      },
    );
  }

  openCreationDialog() {
    this.dialog.open(ProjectFormComponent);
  }
}
