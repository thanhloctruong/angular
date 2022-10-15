import { LogColor, LogLevel } from '../enums/logging';

export class LogEntry {
  msg: string;
  level: LogLevel;
  params: Array<any>;

  get logType(): string {
    return Object.values(LogLevel)[this.level] as string;
  }

  get logFormat(): string {
    switch (this.level) {
      case LogLevel.None:
        return `color: ${LogColor.None}`;
      case LogLevel.Debug:
        return `color: ${LogColor.Debug}`;
      case LogLevel.Info:
        return `color: ${LogColor.Info}`;
      case LogLevel.Warn:
        return `color: ${LogColor.Warn}`;
      case LogLevel.Error:
        return `color: ${LogColor.Error}`;
      case LogLevel.Fatal:
        return `color: ${LogColor.Fatal}`;
      case LogLevel.Off:
        return `color : ${LogColor.Off}`;
      default:
        return '';
    }
  }

  constructor(msg: string, level: LogLevel, params: Array<any>) {
    this.msg = msg;
    this.level = level;
    this.params = params;
  }

  buildLogMessage() {
    let msg = '';
    msg += `Time: ${new Date()}\n`;
    msg += `-------------------------------------------------------\n`;
    msg += `Type: ${this.logType}\n`;
    msg += `-------------------------------------------------------\n`;
    msg += `Message: ${this.msg}\n`;
    msg += `-------------------------------------------------------\n`;
    if (this.params.length) {
      msg += `Extra Info: \n`;
      msg += this.formatParams();
    }
    return msg;
  }

  formatParams() {
    return this.params
      .map((param) => {
        if (typeof param === 'object') {
          return `{ ${Object.keys(param)
            .map((key) => `${key}: ${param[key].toString()}`)
            .join(', ')} }`;
        }
        return param;
      })
      .join(', ');
  }
}
