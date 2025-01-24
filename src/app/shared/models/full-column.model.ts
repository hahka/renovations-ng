import { ColumnType } from '../components/datatable/column-type.enum';
import { Project } from './project.model';

export interface FullColumn<T extends Project> {
  /** A property of the object that will be displayed on the datatable */
  field: keyof T & string; // TODO: Why?

  /** Label used to translate the property name */
  label: string;

  /** Type used to customize column display */
  type?: ColumnType;

  /** A resolve function to resolve data value */
  resolve?: (_: T) => any;
}
