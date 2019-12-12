import { AbstractControl, Validators, ValidationErrors, ValidatorFn, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { ZipCodeLookupService } from '../../services/zip-code-lookup.service';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Address } from '../../models/address';
import { ZipCodeLookupResponse } from '../../models/zip-code-lookup-response';

export class LocationValidator {
  static locationExists(zipcodeLookupService: ZipCodeLookupService): AsyncValidatorFn {
    return (formGroup: FormGroup): Observable<ValidationErrors> => {
      let addressFirstLine = formGroup.get('addressFirstLine').value;
      let addressSecondLine = formGroup.get('addressSecondLine').value;
      let city = formGroup.get('city').value;
      let state = formGroup.get('state').value;

      let address = new Address(addressFirstLine, addressSecondLine, city, state);

      if (addressFirstLine && city && state) {
        return zipcodeLookupService.getZipcodeByAddress(address).pipe(
          map(response => {
            let error = new ZipCodeLookupResponse(response).error;


            return error != undefined ? { locationInvalid: true } : null;
          }),
          catchError(error => {
            formGroup.setErrors({ requestError: true });
          })
        );
      }
    }
  }
}
