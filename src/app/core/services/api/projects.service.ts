import { Injectable } from '@angular/core';
import { IdbStoresEnum } from '../../../utils/enums';
import { ApiService } from '../api/api.service';
import { Project } from '../../../shared/models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService extends ApiService<Project> {
  resource = IdbStoresEnum.PROJECTS;
  offlineRights = {
    read: true,
    manage: false,
  };

  idbSearch(data: Project, keyword: string): boolean {
    return data.name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
  }
}
