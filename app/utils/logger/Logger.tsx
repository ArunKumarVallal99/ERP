declare var __DEV__: boolean;

//logger must used with dev environment validation
export class Logger {
  static logError(tag: string = 'ERROR', log_data: any) {
    if (__DEV__) {
      console.error(tag, JSON.stringify(log_data));
    }
  }

  static logInfo(tag: string = 'INFO', log_data: any) {
    if (__DEV__) {
      console.info(tag, JSON.stringify(log_data));
    }
  }

  static logWarning(tag: string = 'WARNING', log_data: any) {
    if (__DEV__) {
      console.warn(tag, JSON.stringify(log_data));
    }
  }

  static logDebug(tag: string = 'DEBUG', log_data: any) {
    if (__DEV__) {
      console.debug(tag, JSON.stringify(log_data));
    }
  }
}
