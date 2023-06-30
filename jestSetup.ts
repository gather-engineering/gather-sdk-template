import 'web-streams-polyfill';
import * as matchers from 'jest-extended';
import console from 'console';
import 'fake-indexeddb/auto';

expect.extend(matchers);
global.console = console;

jest.mock('@/constants/environment');
jest.mock('@/importers/framework/errorLogger');
