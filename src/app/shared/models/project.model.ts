import { BaseModel } from './api/base.model';
import {Work} from "./work.model";

export class Project implements BaseModel {
  id?: string;
  label!: string;
  startDate!: Date;
  endDate!: Date;
  works: Work[] = [];

  constructor(obj?: Project) {
    console.log(obj);
    Object.assign(this, obj);
  }

  prepareForIdb() {
    return {
      ...this,
      nameSortable: this.label.toUpperCase(),
    };
  }
}
