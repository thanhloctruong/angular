import { FormGroup } from '@angular/forms';

export default class FormUtils {
  /**
   * Run validate for a FormGroup.
   * Mark all item in FormGroup to dirty and update them.
   *
   * @param {FormGroup} [form] Form group need validate
   */
  static Validate(form: any) {
    if (form && form.controls) {
      for (const i in form.controls) {
        if (form.controls.hasOwnProperty(i)) {
          form.controls[i].markAsDirty();
          form.controls[i].updateValueAndValidity();
        }
      }
    }
  }
}
