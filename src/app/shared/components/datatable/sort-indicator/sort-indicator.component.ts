import { Component, Input } from '@angular/core';
import { BaseModel } from '../../../models/api/base.model';
import { ApiDataSource } from '../../../models/api/api-datasource.model';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-sort-indicator',
  imports: [NgClass, NgIf, AsyncPipe],
  templateUrl: './sort-indicator.component.html',
  styleUrls: ['./sort-indicator.component.scss'],
})
export class SortIndicatorComponent<T extends Project> {
  /** DataSource with the sort subject used in the template to display arrow correctly */
  @Input() dataSource?: ApiDataSource<T>;

  /** Field of the current column, to know if we're sorting on it */
  @Input() field?: keyof T;
}
