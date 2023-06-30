import { DataImporter } from '@/importers/framework/dataImporter';
import fs from 'fs';
import path from 'path';

export const traverseDirectory = async (directoryPath: string): Promise<DataImporter[]> => {
  const files = (await fs.promises.readdir(directoryPath)).filter(
    (file) =>
      !file.startsWith('framework') && !file.startsWith('shared') && !file.startsWith('tesla')
  );

  const importers: DataImporter[] = [];

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
      const indexFile = path.join(filePath, 'index.ts');
      const importerName = filePath.split('/').pop();
      if (!fs.existsSync(indexFile)) {
        console.warn(`No index.ts found in ${importerName}`, '❓');
        continue;
      }

      try {
        const defaultImporter = await import(indexFile);
        /* Get the first export object from importer */
        const importer = Object.values(defaultImporter)[0] as DataImporter;
        importers.push(importer);

        console.log(`Imported importer from ${importerName}`, '✅');
      } catch (error: any) {
        console.error(`Error importing index.ts from ${filePath}:`, error);
      }
    }
  }

  return importers;
};
