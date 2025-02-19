import { Injectable } from '@angular/core';
import { IdbStoresEnum } from '../../../utils/enums';
import { ApiService } from './api.service';
import { Work } from '../../../shared/models/work.model';

@Injectable({
  providedIn: 'root',
})
export class WorksService extends ApiService<Work> {
  resource = IdbStoresEnum.WORKS;
  offlineRights = {
    read: true,
    manage: false,
  };

  idbSearch(data: Work, keyword: string): boolean {
    return data.label.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
  }
}
