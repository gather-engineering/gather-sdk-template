import { create } from "zustand";
import { ImportState } from "@/dataStores/types/dataImporterState";

interface ImportStateStore {
  importState: ImportState;
  setImportState: (importState: ImportState) => void;
}

const useImportStateStore = create<ImportStateStore>((set) => ({
  importState: ImportState.DISABLED,
  setImportState: (importState: ImportState) => set({ importState }),
}));

export { useImportStateStore };
