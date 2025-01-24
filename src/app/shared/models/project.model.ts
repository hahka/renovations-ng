import { BaseModel } from './api/base.model';

export class Project implements BaseModel {
  id?: string;
  label!: string;

  constructor(obj?: Project) {
    Object.assign(this, obj);
  }

  prepareForIdb() {
    return {
      ...this,
      nameSortable: this.label.toUpperCase(),
    };
  }
}
