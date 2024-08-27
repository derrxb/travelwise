import type { Level } from 'rollbar';
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN as string,
  // Setting the captureUncaught option to true will register Rollbar as a handler for any uncaught exceptions in your Node process.
  captureUncaught: true,
  // Similarly, setting the captureUnhandledRejections option to true will register Rollbar as a handler for any unhandled Promise rejections in your Node process.
  captureUnhandledRejections: true,
});

/**
 * Server logging that uses Rollbar in production, console.log in dev, and console.warn in tests.
 * @param args
 */
const getLogger =
  (type: Level) =>
  (...args: Rollbar.LogArgument[]) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        rollbar?.[type](...args);
      } else if (process.env.NODE_ENV === 'development') {
        console.log(args);
      } else {
        console.warn(args);
      }
    } catch (e) {
      console.error('Failed to log to Rollbar', args);
    }
  };

const logError = getLogger('error');
const logger = getLogger('info');
const logWarning = getLogger('warning');

export { logError, logger, logWarning };
