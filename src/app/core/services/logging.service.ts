import { LogEntry } from './../models/log-entry';
import { Inject, Injectable } from '@angular/core';
import { LogLevel } from '../enums/logging';
import { LogConfig } from '../interfaces/logging';
import { LOG_CONFIG } from '../tokens/logging';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(
    @Inject(LOG_CONFIG) private logConfig: LogConfig
  ) {
    console.log(logConfig);
  }

  log(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.None, params);
  }

  debug(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.Debug, params);
  }

  info(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.Info, params);
  }

  warn(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.Warn, params);
  }

  error(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.Error, params);
  }

  fatal(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.Fatal, params);
  }

  off(msg: string, ...params: any[]): void {
    this.writeLog(msg, LogLevel.Off, params);
  }

  writeLog(msg: string, level: LogLevel, params: Array<any>) {
    if(Object.values(LogLevel).includes(level)) {
      const logEntry = new LogEntry(msg, level, params);
      console.log("%c" + logEntry.buildLogMessage(), logEntry.logFormat);
    }
  }
}
