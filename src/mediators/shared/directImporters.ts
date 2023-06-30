import { amazonImporter } from "@/importers/amazon";
import { DATA_SOURCES } from "@/constants/dataSources";
import { DataImporter } from "@/importers/framework/dataImporter";

export const directImporters: Record<string, DataImporter> = {
  [DATA_SOURCES.AMAZON]: amazonImporter,
};
