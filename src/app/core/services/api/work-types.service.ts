import {
  effect,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { IdbStoresEnum } from '../../../utils/enums';
import { ApiService } from './api.service';
import { Work } from '../../../shared/models/work.model';
import { WorkType } from '../../../shared/models/work-type.model';
import { BehaviorSubject, switchMap } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';
import { HttpClient } from '@angular/common/http';
import { IdbService } from '../idb.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class WorkTypesService extends ApiService<WorkType> {
  resource = IdbStoresEnum.WORK_TYPES;
  offlineRights = {
    read: true,
    manage: false,
  };

  refreshWorkTypes = new BehaviorSubject(true);
  workTypes$ = this.refreshWorkTypes.pipe(switchMap(() => this.getAll()));
  workTypes: Signal<WorkType[]> = toSignal(this.workTypes$, {
    initialValue: [],
  });

  constructor(
    environmentService: EnvironmentService,
    httpClient: HttpClient,
    idbService: IdbService<WorkType>,
  ) {
    super(environmentService, httpClient, idbService);

    effect(() => {
      if (!this.workTypes().length) {
        this.refreshWorkTypes.next(true);
      }
      console.log('Need to load workTypes');
    });
  }

  idbSearch(data: Work, keyword: string): boolean {
    return data.label.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
  }
}
