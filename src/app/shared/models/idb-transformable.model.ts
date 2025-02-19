import { BaseModelImpls } from '../../utils/types';

export interface IdbTransformable {
  prepareForIdb(): BaseModelImpls;
}
