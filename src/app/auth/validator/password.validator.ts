import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {
  public static strong(control: FormControl): ValidationResult | null {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    let hasNonAlpha = /[^A-Za-z0-9]/.test(control.value);

    const valid = hasNumber && hasUpper && hasLower && hasNonAlpha;
    if (!valid) {
      return { strong: true };
    }

    return null;
  }

  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}
