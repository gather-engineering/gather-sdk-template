export class DataImporterError extends Error {
  action?: string;

  constructor(error: Error, action?: string) {
    super(error.message, { cause: error });
    this.name = this.constructor.name;
    this.action = action;
  }
}
