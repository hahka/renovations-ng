import { Component, OnInit } from '@angular/core';
import { DetailComponent } from '../detail/detail.component';
import { BaseModelImpls } from '../../../utils/types';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { PageHeaderEvent } from '../page-header/page-header-event.interface';
import { PageHeaderAction } from '../page-header/page-header-action.enum';

@Component({
  template: '',
  styleUrl: './abstract-information.component.scss',
})
export abstract class AbstractInformationComponent<T extends BaseModelImpls>
  extends DetailComponent<T>
  implements OnInit
{
  abstract edit(data: T): unknown; // TODO: type

  /** Id of the object */
  detailId: string = ''; // TODO: check initial value

  /** Observable of the object id */
  detailId$?: Observable<string>;

  ngOnInit(): void {
    if (!this.detail$) {
      this.detail$ = this.refresh.asObservable().pipe(
        tap((data) => console.log(data)),
        switchMap((refreshedId) => {
          this.detailId = refreshedId;

          return this.apiService.getById(this.detailId);
        }),
      );

      this.detailId$ = this.activatedRoute.paramMap.pipe(
        map((paramMap) => {
          const detailId = paramMap.get('id');
          if (!detailId) {
            // TODO: better error handling, this should not happen, maybe at init?
            return '';
          }
          this.refresh.next(detailId);

          return detailId;
        }),
      );
    }
  }

  /**
   * Called when the user click on archive via PageHeaderComponent
   */
  archive(): void {
    if (this.detailId) {
      this.apiObsHelper?.archive(this.detailId, this.isArchived); // TODO: ? assertion
    }
  }

  /**
   * Called when the user click on archive via PageHeaderComponent
   */
  delete(): void {
    if (this.detailId) {
      this.apiObsHelper?.delete(this.detailId); // TODO: ? assertion
    }
  }

  /**
   * Handles events send by the page header
   * @param pageHeaderEvent Event sent by the page header
   */
  onPageHeaderEvent(pageHeaderEvent: PageHeaderEvent, data: T): void {
    switch (pageHeaderEvent.action) {
      case PageHeaderAction.BACK:
        this.locationService.back();
        break;
      case PageHeaderAction.CANCEL:
        this.locationService.back();
        break;
      case PageHeaderAction.ARCHIVE:
        this.archive();
        break;
      case PageHeaderAction.UPDATE:
        this.edit(data);
        break;
      /*case PageHeaderAction.SAVE:
        this.submit();
        break;*/
    }
  }
}
