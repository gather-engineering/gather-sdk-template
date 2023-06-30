/**
 * All PubSub message constants
 */

/**
 * For importing data
 * Use one message for all at the moment
 */
export const PUBSUB_MESSAGES = {
  UNREGISTER: 'UNREGISTER',
  RESUME: 'RESUME',
  INITIALIZE: 'INITIALIZE',
  INITIALIZE_LOGGER: 'INITIALIZE_LOGGER',
  START_AUTHENTICATION: 'START_AUTHENTICATION',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHENTICATION_CANCELLED: 'AUTHENTICATION_CANCELLED',
  IMPORT: 'IMPORT',
  IMPORT_STATE: 'IMPORT_STATE',
  IMPORT_STATE_RESPONSE: 'IMPORT_STATE_RESPONSE',
  UPDATE_SCHEDULE_IMPORT: 'UPDATE_SCHEDULE_IMPORT',
  TOKEN_RETRIEVED: 'TOKEN_RETRIEVED',
  START_LOGIN: 'START_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  USERNAME_PASSWORD_RETRIEVED: 'USERNAME_PASSWORD_RETRIEVED',

  // upload flow
  REQUEST_EMAIL_AUTHENTICATION: 'REQUEST_EMAIL_AUTHENTICATION',
  REQUEST_DATA: 'REQUEST_DATA',
  CONFIRM_DATA_REQUEST_EMAIL: 'CONFIRM_DATA_REQUEST_EMAIL',
  PENDING_UPLOAD: 'PENDING_UPLOAD',
  START_UPLOAD: 'START_UPLOAD',
  UPLOAD: 'UPLOAD',
};
