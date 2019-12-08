import { AbstractControl, Validators, ValidationErrors, ValidatorFn, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { ZipPostalCodeLookupService } from '../../services/zip-postal-code-lookup.service';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from '../../models/address';
import { ZipPostalCodeLookupResponse } from '../../models/zip-postal-code-lookup-response';

export class LocationValidator {
  static locationExists(zipcodeLookupService: ZipPostalCodeLookupService): AsyncValidatorFn {
    return (formGroup: FormGroup): Observable<ValidationErrors> => {
      let addressFirstLine = formGroup.get('addressFirstLine').value;
      let addressSecondLine = formGroup.get('addressSecondLine').value;
      let city = formGroup.get('city').value;
      let state = formGroup.get('state').value;

      let address = new Address(addressFirstLine, addressSecondLine, city, state);

      if (addressFirstLine && city && state) {
        return zipcodeLookupService.getZipcodeByAddress(address).pipe(
          map(response => {
            let zipcode = new ZipPostalCodeLookupResponse(response).zipcode;


            return zipcode != undefined && zipcode != null ? null : { locationInvalid: true };
          })
        );
      }
    }
  }
}
