import { ApiService } from '../../../core/services/api/api.service';
import { ApiDataSource } from '../../models/api/api-datasource.model';
import { Project } from '../../models/project.model';
import { FullColumn } from '../../models/full-column.model';

export abstract class AbstractListComponent<T extends Project> {
  /** DataSource that will be used to display data and centralize communication between app and api */
  abstract dataSource: ApiDataSource<T>;

  /** List of columns that will be displayed for the current list */
  abstract fullColumns: FullColumn<T>[];

  /** Key used */
  abstract listPersistenceKey: string;

  canManage: boolean;

  isOnline: boolean;

  constructor(private readonly apiService: ApiService<T>) {
    this.canManage = this.apiService.canManage();
    this.isOnline = navigator.onLine;
  }
}
