import dayjs from 'dayjs';
import { parse } from 'papaparse';

/**
 * generic implementation used by all type specific parsers
 * @param bodyCsv csv string
 * @param expectedFields csv column names in the expected order
 * @param map maps single csv row to the expected type
 * @param options parser options. useful to report about field order changes or missing fields, etc..
 * @returns parsed, ordered list of mapped entries
 */
export function parseCsv<T>(
  bodyCsv: string,
  map: (data: { [column: string]: string }) => T,
  options?: {
    expectedColumns: string[];
    onSchemaDiff: (msg: string) => void;
  }
): T[] {
  const parseResult = parse(bodyCsv, { skipEmptyLines: true, header: true });

  if (parseResult.errors.length > 0) {
    throw new Error('csv parsing error' + parseResult.errors.toString());
  }

  if (options) {
    const diff = diffSchema(options.expectedColumns, parseResult.meta.fields ?? []);
    if (diff) {
      options.onSchemaDiff(diff);
    }
  }

  return parseResult.data.map((item: any) => map(item));
}

function diffSchema(expectedFields: string[], availableFields: string[]): string {
  const missingFields = expectedFields.filter((f) => !availableFields.includes(f));
  const additionalFields = availableFields.filter((f) => !expectedFields.includes(f));

  let schemaDiff = '';

  if (missingFields.length > 0) {
    schemaDiff += `Missing Fields: ${missingFields.join()};`;
  }

  if (additionalFields.length > 0) {
    schemaDiff += `New Fields: ${additionalFields.join()};`;
  }

  return schemaDiff;
}

export function parseNumber(inputStr?: string): number | undefined {
  if (!inputStr || inputStr.toLowerCase() === 'n/a') {
    return undefined;
  }

  return parseFloat(inputStr.replaceAll(',', ''));
}

export function parseDate(
  inputStr: string | undefined,
  format?: string,
  onParseError?: (msg: string) => void
): Date | undefined {
  if (!inputStr || inputStr.toLowerCase() === 'n/a') {
    return undefined;
  }

  if (!dayjs(inputStr, format).isValid()) {
    if (onParseError) {
      onParseError(inputStr);
    }

    return undefined;
  }

  return dayjs(inputStr, { utc: true, format: format }).toDate();
}
