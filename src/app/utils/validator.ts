import { AbstractControl, ValidationErrors } from '@angular/forms';

export default class ValidatorUtils {
  /**
   * Validate date range for Form Controls
   *
   * @param controls {AbstractControl}
   * @param {string} [startControlName=startDate]
   * @param {string} [endControlName=endDate]
   * @returns {ValidationErrors | null}
   */
  static DateRangeValidator(controls: AbstractControl, startControlName?: string, endControlName?: string): ValidationErrors | null {
    const startDate = controls.get(startControlName || 'startDate')?.value;
    const endDate = controls.get(endControlName || 'endDate')?.value;
    if (startDate && endDate) {
      if (startDate > endDate) {
        return {
          dateRange: true,
        };
      }
    }
    return null;
  }
}

