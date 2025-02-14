import { BaseModel } from './api/base.model';

export class Work implements BaseModel {
    id?: string;
    label!: string;
    startDate!: Date;
    endDate!: Date;

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
