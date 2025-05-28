import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private readonly translateService: TranslateService,
    private readonly dateAdapter: DateAdapter<unknown, unknown>,
  ) {
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');

    this.dateAdapter.setLocale('fr');
  }
}
