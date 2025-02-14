import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-searchbar',
  imports: [CommonModule, TranslatePipe, MatInputModule],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  /** Value that has been typed by the user. Mostly used when going back from detail to list. */
  @Input() searchValue?: string = '';

  /** Event that will be sent to the parent component */
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  /** Event sent by the input when the user types in */
  onKeyup(value: string): void {
    this.search.emit(value);
  }
}
