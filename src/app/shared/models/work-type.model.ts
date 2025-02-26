import { BaseModel } from './api/base.model';

export class WorkType implements BaseModel {
  id?: string;
  label!: string;

  constructor(obj?: WorkType) {
    Object.assign(this, obj);
  }

  prepareForIdb() {
    return {
      ...this,
    };
  }
}
