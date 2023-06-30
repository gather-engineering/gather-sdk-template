import { DataImporterError } from '@/types/customErrors/DataImporterError';

export class AmazonImporterService {
  constructor() {
  }

  async importData(): Promise<void> {
    try {
      /* TODO: Start import data */
      throw new Error('Not implemented');
    } catch (error) {
      if (error instanceof Error) {
        throw new DataImporterError(error, 'amazonImporterService.importData');
      }
      throw error;
    }
  }
  async hasData(): Promise<boolean> {
    return false;
  }

  /* TODO: Add other methods here */
}
