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

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe, CommonModule, DatatableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent extends AbstractListComponent<Project> {
  dataSource: ApiDataSource<Project>;
  fullColumns: FullColumn<Project>[] = [
    {
      field: 'label',
      label: 'common.label',
      type: ColumnType.string,
    },
  ];

  // TODO: used anymore?
  listPersistenceKey = 'projects';

  constructor(private readonly projectsService: ProjectsService) {
    super(projectsService);
    this.dataSource = new ApiDataSource<Project>(
      (request, query) => {
        return this.projectsService.search(request, query);
      },
      {
        initialQuery: { search: '' },
        initialSort: { field: 'id', order: 1 },
      },
    );

  }

}
