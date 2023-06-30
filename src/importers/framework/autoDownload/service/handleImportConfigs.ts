import Dexie from 'dexie';
import { UploadImportConfigType } from '../types';

export interface DexieWithImportConfigs {
  importConfigs: Dexie.Table<UploadImportConfigType>;
}

export class ImportConfigs<T extends DexieWithImportConfigs> {
  datasourceName!: string;
  datastore!: T;
  constructor(dataStore: T) {
    this.datastore = dataStore;
  }

  async getImportConfigs(): Promise<UploadImportConfigType | undefined> {
    return await this.datastore.importConfigs?.get(0);
  }

  async getLastConfirmationEmail(): Promise<string | undefined> {
    const importConfig = await this.getImportConfigs();
    return importConfig?.lastConfirmationEmail;
  }

  async getLastDownloadEmail(): Promise<string | undefined> {
    const importConfig = await this.getImportConfigs();
    return importConfig?.lastDownloadEmail;
  }

  async updateConfig(
    lastConfirmationEmail: string | null,
    lastDownloadEmail: string | null
  ): Promise<void> {
    const configs = await this.getImportConfigs();

    await this.datastore.importConfigs.put(
      {
        ...configs,
        ...(lastConfirmationEmail && { lastConfirmationEmail }),
        ...(lastDownloadEmail && { lastDownloadEmail }),
        lastTimeImport: Date.now(),
      },
      0
    );
  }
}
