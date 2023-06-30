/// <reference types="jest-extended" />
/// <reference types="jest-expect-message" />
/* This will test all the importers */
import path from 'path';
import { traverseDirectory } from '@/tests/utils/traverseDirectories';
import { DataImporter } from '@/importers/framework/dataImporter';
import { IMPORT_FLOW_STATES } from '@/importers/sharedXState/importFlowStates.common';
import { BASE_STATES } from '@/importers/sharedXState/baseStates.common';
import { UPLOAD_FLOW_STATES } from '@/importers/sharedXState/uploadFlowStates.common';
import { ImportFlow } from '@/importers/framework/dataImporter/types/importFlowType';

const importersDir = path.join(__dirname, '../../importers');
let allImporters: DataImporter[] = [];

const requiredStatesNormalFlow = [
  ...Object.values(BASE_STATES).filter((x) => x !== BASE_STATES.SWITCH),
  ...Object.values(IMPORT_FLOW_STATES),
];

const requiredStatesUploadFlow = [
  ...Object.values(BASE_STATES).filter((x) => x !== BASE_STATES.SWITCH),
  ...Object.values(UPLOAD_FLOW_STATES).filter(
    (x) =>
      x !== UPLOAD_FLOW_STATES.REQUEST_DATA_RETRY &&
      x !== UPLOAD_FLOW_STATES.REQUEST_EMAIL_AUTHENTICATION_ERROR &&
      x !== UPLOAD_FLOW_STATES.SCHEDULE_NEXT_CHECK_UPLOAD_FILE_READY
  ),
];

describe('Testing Importers', () => {
  beforeAll(async () => {
    allImporters = await traverseDirectory(importersDir);
  });

  test('Importers should declared all required states', async () => {
    for (const importer of allImporters) {
      const flowType = importer.flowType;
      const machine = importer.initializeImportMachine();
      const states = Object.keys(machine.states).sort();
      if (flowType === ImportFlow.NORMAL_FLOW) {
        /* Get the values from requiredStates that are not in states */
        const missingStates = requiredStatesNormalFlow.filter((x) => !states.includes(x));
        expect(
          states,
          `${machine.id} type ${flowType} missing states: ${missingStates}`
        ).toIncludeAllMembers(requiredStatesNormalFlow);
      } else {
        /* Get the values from requiredStates that are not in states */
        const missingStates = requiredStatesUploadFlow.filter((x) => !states.includes(x));
        expect(
          states,
          `${machine.id} type ${flowType} missing states: ${missingStates}`
        ).toIncludeAllMembers(requiredStatesUploadFlow);
      }
    }
  });

  test('Initial state must be DISABLE', async () => {
    for (const importer of allImporters) {
      const machine = importer.initializeImportMachine();
      expect(
        machine.initialState.value,
        `${machine.id} initial state not match ${BASE_STATES.DISABLED}`
      ).toEqual(BASE_STATES.DISABLED);
    }
  });

  test('Normal flow states must be matched', async () => {
    for (const importer of allImporters) {
      if (importer.flowType === ImportFlow.UPLOAD_FLOW) continue;

      const machine = importer.initializeImportMachine();

      let actualState = machine.transition(machine.initialState, 'ENABLE');
      expect(actualState.value, `${machine.id} state not match ${BASE_STATES.ENABLED}`).toEqual(
        BASE_STATES.ENABLED
      );

      actualState = machine.transition(actualState, 'START_AUTHENTICATION');
      expect(
        actualState.value,
        `${machine.id} state not match ${BASE_STATES.REQUESTING_PERMISSION}`
      ).toEqual(BASE_STATES.REQUESTING_PERMISSION);

      actualState = machine.transition(actualState, 'IMPORT');
      expect(
        actualState.value,
        `${machine.id} state not match ${IMPORT_FLOW_STATES.IMPORT}`
      ).toContain(IMPORT_FLOW_STATES.IMPORT);
      /* Check the meta too */
    }
  });
});
