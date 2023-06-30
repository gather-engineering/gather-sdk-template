import JSZip from 'jszip';
import { BlobReader, TextWriter, ZipReader } from '@zip.js/zip.js';
import { SpotifyStreamingHistory } from '../importers/spotify/types';

export const unZipFile = async (file: File): Promise<JSZip.JSZipObject[]> => {
  if (file.type !== 'application/zip') {
    throw new Error(`File type ${file.type} is not zip.`);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const files: JSZip.JSZipObject[] = [];

    reader.onload = async (e) => {
      const data = e.target?.result;
      try {
        if (!data) {
          throw new Error('No data found for unzip file.');
        }
        const zipFile = await JSZip.loadAsync(data);
        zipFile.forEach((_, zipEntry) => {
          if (!zipEntry.dir) {
            files.push(zipEntry);
          }
        });
        resolve(files);
      } catch (error) {
        console.error('Error reading zip file:', error);
        reject(error);
      }
    };
    reader.onerror = (e) => {
      reject(new Error('Error reading file: ' + e.target?.error));
    };
    reader.readAsArrayBuffer(file);
  });
};

export const downloadZipFile = async (
  url: string,
  fileNameFilters?: string[], // if none provided, return all
  password?: string
): Promise<Map<string, string>> => {
  const httpResponse = await fetch(url);

  try {
    const options = password ? { password } : {};
    const zipReader = new ZipReader(new BlobReader(await httpResponse.blob()), options);
    const zipEntries = await zipReader.getEntries();
    const fileContentsByName = new Map() as Map<string, string>;

    for (const entry of zipEntries) {
      // skip if filter is provided and none of the filters match the file name
      if (fileNameFilters && !fileNameFilters.find((filter) => entry.filename.includes(filter))) {
        continue;
      }
      const fileContent = entry.getData ? await entry.getData(new TextWriter()) : undefined;
      if (fileContent) {
        fileContentsByName.set(entry.filename, fileContent);
      }
    }
    return fileContentsByName;
  } catch (error) {
    throw new Error(`Error unzipping file: ${error}`);
  }
};

export const getAndUnZipSpotifyData = async (
  url: string
): Promise<SpotifyStreamingHistory[] | undefined> => {
  const httpResponse = await fetch(url);

  try {
    const zipReader = new ZipReader(new BlobReader(await httpResponse.blob()));
    const zipEntries = await zipReader.getEntries();
    const codZipEntry = zipEntries.find((e) => {
      return e.filename.includes('StreamingHistory');
    });

    const codCsv = codZipEntry?.getData ? await codZipEntry.getData(new TextWriter()) : undefined;
    await zipReader.close();

    if (!codCsv) return;

    return JSON.parse(codCsv) as SpotifyStreamingHistory[];
  } catch (error) {
    throw new Error(`Error unzipping file: ${error}`);
  }
};

export const getAndUnZipTeslaData = async (
  url: string,
  password: string
): Promise<[string, string]> => {
  const httpResponse = await fetch(url);

  try {
    const zipReader = new ZipReader(new BlobReader(await httpResponse.blob()), { password });
    const zipEntries = await zipReader.getEntries();
    // charging data
    const chargingDatacodZipEntry = zipEntries.find((e) => {
      return e.filename.includes('Charging Data');
    });
    // safety score
    const safetyScorecodZipEntry = zipEntries.find((e) => {
      return e.filename.includes('Safety Score Data');
    });

    await zipReader.close();

    const chargingDatacodCsv = chargingDatacodZipEntry?.getData
      ? await chargingDatacodZipEntry.getData(new TextWriter())
      : undefined;

    const safetyScorecodCsv =
      (safetyScorecodZipEntry?.getData
        ? await safetyScorecodZipEntry.getData(new TextWriter())
        : undefined) || '';

    return [
      chargingDatacodCsv || '',
      removeDisclaimer(
        safetyScorecodCsv,
        2 // disclaimer count
      ),
    ];
  } catch (error) {
    throw new Error(`Error unzipping file: ${error}`);
  }
};

export const getAndUnZipLinkedInData = async (url: string): Promise<string[]> => {
  const httpResponse = await fetch(url);

  try {
    const zipReader = new ZipReader(new BlobReader(await httpResponse.blob()));
    const zipEntries = await zipReader.getEntries();
    // ad targeting data
    const adTargetingZipEntry = zipEntries.find((e) => {
      return e.filename.includes('Ad_Targeting');
    });
    // profile data
    const profileCodZipEntry = zipEntries.find((e) => {
      return e.filename.includes('Profile');
    });

    await zipReader.close();

    const adTargetingCodCsv =
      (adTargetingZipEntry?.getData
        ? await adTargetingZipEntry.getData(new TextWriter())
        : undefined) || '';

    const profileCodCsv =
      (profileCodZipEntry?.getData
        ? await profileCodZipEntry.getData(new TextWriter())
        : undefined) || '';

    return [adTargetingCodCsv, profileCodCsv];
  } catch (error) {
    throw new Error(`Error unzipping file: ${error}`);
  }
};

export const removeDisclaimer = (csvString: string, disclaimerCount: number): string => {
  let lines = csvString.split('\n');
  // Remove the first disclaimerCount lines
  lines = lines.slice(disclaimerCount);

  return lines.join('\n');
};
