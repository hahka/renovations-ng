import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { PageHeaderAction } from './page-header-action.enum';
import { PageHeaderEvent } from './page-header-event.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * TODO: clean this component => edition no needed anymore because every update will be in popup or form
 */
@Component({
  selector: 'app-page-header',
  imports: [MatIconModule, MatButtonModule, CommonModule, TranslatePipe],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  /** FormControl/FormGroup of the page, used to know if in edit mode or readonly */
  // TODO: better assertion
  @Input() control!: AbstractControl;

  /** Wether the unarchiving is allowed */
  @Input() canUnarchive = false;

  /** Wether the object is archived, to know which buttons display */
  @Input() isArchived = false;

  /** Wether The header is user for lists */
  @Input() forList = false;

  /** For use in template */
  PageHeaderAction = PageHeaderAction;

  /** Event when the user clicks on a button */
  @Output() pageHeaderEvent = new EventEmitter<PageHeaderEvent>();

  /** Title to be displayed in the header */
  @Input() title = '';

  /** Wether buttons on the upper right corner should be displayed, mainly if in edit mode */
  get displayCrudBtn(): boolean {
    return !!this.control;
  }

  get displayArchive(): boolean {
    if (!this.displayCrudBtn) {
      return false;
    }
    if (this.isArchived && !this.canUnarchive) {
      return false;
    }

    const id = this.control.get('id');

    return id && id.value;
  }

  online: boolean;

  constructor() {
    this.online = navigator.onLine;
  }

  /** Handles the buttons' click event */
  onClick(event: PageHeaderAction): void {
    if (event === PageHeaderAction.BACK || event === PageHeaderAction.CANCEL) {
      // TODO: prevent user via popup? (via onDeactivate vs !this.readonly?)
      this.pageHeaderEvent.emit({ action: event });
    } else {
      // TODO: still relevant?
      this.pageHeaderEvent.emit({ action: event });
    }
  }
}
