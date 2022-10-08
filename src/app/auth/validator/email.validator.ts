import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export class UserValidator {
  static validate(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService.userExists(control.value).pipe(
        map((result: boolean) => {
          return result ? { userExists: true } : null;
        })
      );
    };
  }
}
