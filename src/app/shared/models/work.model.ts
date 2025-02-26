import { BaseModel } from './api/base.model';
import { Project } from './project.model';
import { WorkType } from './work-type.model';

export class Work implements BaseModel {
  id?: string;
  label!: string;
  startDate!: Date;
  endDate!: Date;
  parentProject?: Project;
  workType?: WorkType;

  constructor(obj?: Work) {
    Object.assign(this, obj);
  }

  prepareForIdb() {
    return {
      ...this,
      nameSortable: this.label.toUpperCase(),
    };
  }
}
