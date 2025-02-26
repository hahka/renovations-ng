import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, IDBPTransaction, openDB } from 'idb';
import { IdbStoresEnum } from '../../utils/enums';
import { Project } from '../../shared/models/project.model';
import { BaseModelImpls } from '../../utils/types';
import { Work } from '../../shared/models/work.model';
import { WorkType } from '../../shared/models/work-type.model';

interface MyDB extends DBSchema {
  // TODO: schema
  projects: {
    value: Project;
    key: string;
    indexes: any;
  };
  works: {
    value: Work;
    key: string;
    indexes: any;
  };
  workTypes: {
    value: WorkType;
    key: string;
    indexes: any;
  };
  /*products: {
    value: Product;
    key: string;
    indexes: any;
  };
  stock: {
    value: Stock;
    key: string;
    indexes: any;
  };
  marketSales: {
    value: MarketSales;
    key: string;
    indexes: any;
  };*/
}

// TODO: type
@Injectable({
  providedIn: 'root',
})
export class IdbCommonService<T extends BaseModelImpls> {
  static upgradeToV1(db: IDBPDatabase<MyDB>) {
    /*const marketsStore = db.createObjectStore(IdbStoresEnum.MARKETS);
    marketsStore.createIndex('nameSortable', 'nameSortable');
    const productsStore = db.createObjectStore(IdbStoresEnum.PRODUCTS);
    productsStore.createIndex('nameSortable', 'nameSortable');*/
  }

  onlineIdb!: IDBPDatabase<MyDB>;

  databaseName = 'OnlineIdb';
  databaseVersion = 3;

  constructor() {
    this.connectToIDB();
  }

  public async connectToIDB() {
    if (!this.onlineIdb) {
      this.onlineIdb = await openDB<MyDB>(
        this.databaseName,
        this.databaseVersion,
        {
          upgrade(db, oldVersion, newVersion, transaction) {
            if (newVersion) {
              let currentVersion = oldVersion;

              while (currentVersion < newVersion) {
                switch (currentVersion) {
                  case 0:
                    IdbCommonService.upgradeToV1(db);
                    break;
                  default:
                    break;
                }

                currentVersion++;
              }
            }
          },
        },
      );
    }
  }

  public async putCommon(
    store: IdbStoresEnum,
    data: BaseModelImpls,
    id?: string,
  ) {
    const dataId = id || Date.now().toString();
    await this.onlineIdb.put(store, data, dataId);

    return this.onlineIdb.get(store, dataId);
  }

  public async disconnectFromIDB() {
    this.onlineIdb.close();
  }

  public async getAll(store: IdbStoresEnum) {
    await this.connectToIDB();

    return this.onlineIdb.getAll(store);
  }

  public async getById(store: IdbStoresEnum, id: string) {
    await this.connectToIDB();

    return this.onlineIdb.get(store, id);
  }

  public async deleteByID(store: IdbStoresEnum, id: string) {
    await this.connectToIDB();

    return this.onlineIdb.delete(store, id);
  }

  public clearObjectStore(storeName: IdbStoresEnum): Promise<void> {
    return this.onlineIdb.clear(storeName);
  }
}
