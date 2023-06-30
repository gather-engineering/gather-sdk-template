---
to: src/importers/<%= h.changeCase.camelCase(name) %>/service/index.ts
---
import { DataImporterError } from '@/types/customErrors/DataImporterError';

export class <%= h.changeCase.pascalCase(name) %>ImporterService {
  constructor() {
  }

  async importData(): Promise<void> {
    try {
      /* TODO: Start import data */
      throw new Error('Not implemented');
    } catch (error) {
      if (error instanceof Error) {
        throw new DataImporterError(error, '<%= h.changeCase.camelCase(name) %>ImporterService.importData');
      }
      throw error;
    }
  }
  async hasData(): Promise<boolean> {
    return false;
  }

  /* TODO: Add other methods here */
}
