import { Component } from '@angular/core';
import { AbstractInformationComponent } from '../../../shared/components/abstract-information/abstract-information.component';
import { Work } from '../../../shared/models/work.model';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { WorkFormComponent } from '../work-form/work-form.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { MatCard } from '@angular/material/card';
import { WorksService } from '../../../core/services/api/works.service';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'app-work-info',
  imports: [AsyncPipe, TranslatePipe, PageHeaderComponent, MatCard, NgIf],
  templateUrl: './work-info.component.html',
  styleUrl: './work-info.component.scss',
})
export class WorkInfoComponent extends AbstractInformationComponent<Work> {
  override edit(data: Work): void {
    this.matDialog
      .open(WorkFormComponent, { data })
      .beforeClosed()
      .pipe(tap(() => this.refresh.next(data.id as string)))
      .subscribe();
  }

  constructor(
    public matDialog: MatDialog,
    activatedRoute: ActivatedRoute,
    worksService: WorksService,
    locationService: LocationService,
    router: Router,
  ) {
    super(activatedRoute, worksService, locationService, router);
  }
}
