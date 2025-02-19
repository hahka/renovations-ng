import { Injectable } from '@angular/core';
import { SearchDto } from '../../shared/models/api/search-dto.model';
import { IdbStoresEnum } from '../../utils/enums';
import { Page, PageRequest } from './api';
import { IdbCommonService } from './idb-common.service';
import { BaseModelImpls } from '../../utils/types';

@Injectable({
  providedIn: 'root',
})
export class IdbService<T extends BaseModelImpls> extends IdbCommonService<T> {
  constructor() {
    super();
  }

  public async put(store: IdbStoresEnum, data: T, id?: string) {
    let dataId = id;
    if (!dataId) {
      dataId = Date.now().toString();
      data.id = dataId;
    }

    return super.putCommon(store, data.prepareForIdb(), dataId);
  }

  public async search(
    storeName: IdbStoresEnum,
    pageRequest: PageRequest<T>,
    _dto: SearchDto,
    idbSearch: (data: any, keyword: string) => boolean,
  ): Promise<Page<any>> {
    await super.connectToIDB();
    const store = this.onlineIdb.transaction(storeName, 'readonly').store;

    const sort = pageRequest.sort;
    const indexedStore = store.index(
      sort ? `${String(sort.field)}Sortable` : 'nameSortable',
    );

    let cursor = await indexedStore.openCursor(
      undefined,
      sort && sort.order === 'desc' ? 'prev' : 'next',
    );

    let total = 0;

    const content = [];
    let dataRemaining = pageRequest.size;
    while (true) {
      if (cursor) {
        const value = cursor.value;

        if (idbSearch(value, _dto.search)) {
          if (dataRemaining > 0) {
            content.push(value);
            dataRemaining -= 1;
          }
          total += 1;
        }
        cursor = await cursor.continue();
      } else {
        break;
      }
    }

    return {
      content,
      pageable: {
        // TODO: clean that shit with pageable
        pageNumber: 0,
        offset: 0,
        pageSize: 0,
        paged: false,
        sort: {
          empty: false,
          sorted: false,
          unsorted: false,
        },
        unpaged: false,
      },
      numberOfElements: content.length,
      totalElements: total,
      totalPages: total,
      first: true,
      last: true,
      empty: false,
    };
  }
}
