import { Component } from '@angular/core';
import {DetailComponent} from "../../../shared/components/detail/detail.component";
import {Work} from "../../../shared/models/work.model";
import {ApiObsHelperComponent} from "../../../shared/components/api-obs-helper/api-obs-helper.component";
import {AsyncPipe, Location, NgIf} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {PageHeaderComponent} from "../../../shared/components/page-header/page-header.component";
import {MatInputModule} from "@angular/material/input";
import {TranslatePipe} from "@ngx-translate/core";
import {MatError, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatCard} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ActivatedRoute, Router} from "@angular/router";
import {WorksService} from "../../../core/services/api/works.service";

@Component({
  selector: 'app-work-details',
  imports: [ApiObsHelperComponent, NgIf, AsyncPipe, ReactiveFormsModule, PageHeaderComponent, MatInputModule, TranslatePipe, MatFormFieldModule, MatLabel, MatError, MatCard, MatDatepickerModule],
  templateUrl: './work-details.component.html',
  styleUrl: './work-details.component.scss'
})
export class WorkDetailsComponent extends DetailComponent<Work>{
  override newData(): Work {
    return new Work();
  }
  override getFormattedData(): Work {
    return new Work(this.form.value);
  }

  constructor(public formBuilder: FormBuilder, activatedRoute: ActivatedRoute, worksService: WorksService, location: Location, router: Router) {
    super(activatedRoute, worksService, location, router);

    this.form = this.formBuilder.group({
      id: [''],
      label: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }
}
