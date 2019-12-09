import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../models/address';
import { UsState } from '../models/us-state';
import { ZipCodeLookupService } from '../services/zip-code-lookup.service';
import { ZipCodeLookupResponse } from '../models/zip-code-lookup-response';
import { UsStateService } from '../services/us-state.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { LocationValidator } from './validators/location-validator';
import { startWith, filter, take, map } from 'rxjs/operators';


@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  locationForm = this.fb.group(
    {
      addressFirstLine: ['', Validators.required],
      addressSecondLine: [''],
      city: ['', Validators.required],
      state: ['', Validators.required]
    },
    {
      asyncValidators: LocationValidator.locationExists(this.ZipPostalCodeLookupService),
      updateOn: 'submit'
    }
  );

  statesSubscription: Subscription;
  states$: Observable<UsState[]>;
  states: UsState[];

  zipcodeResult: ZipCodeLookupResponse;

  resultLoading: boolean;

  loadingMode = 'indeterminate';

  constructor(
    private fb: FormBuilder,
    private stateService: UsStateService,
    private ZipPostalCodeLookupService: ZipCodeLookupService) {}

  ngOnInit() {
    this.statesSubscription = this.stateService.getStates().subscribe(states => {
      this.states = states;
    });
  }

  ngOnDestroy() {
    this.statesSubscription.unsubscribe();
  }

  getZipPostalCodeByAddress() {
    this.resultLoading = true;

    let locationForm = this.locationForm;
    let locationFormValue = locationForm.value;

    let address = new Address(
      locationFormValue.addressFirstLine,
      locationFormValue.addressSecondLine,
      locationFormValue.city,
      locationFormValue.state
    );

    let formValidationIndicator$ = this.locationForm.statusChanges.pipe(
      startWith(this.locationForm.status),
      filter(status => status !== 'PENDING'),
      take(1),
      map(status => {
        if (status === 'INVALID') {
          this.resultLoading = false;
        }
        return status;
      }),
      filter(status => status === 'VALID')
    );

    formValidationIndicator$.subscribe(formValid => {
      this.ZipPostalCodeLookupService.getZipcodeByAddress(address).subscribe(response => {
        this.zipcodeResult = new ZipCodeLookupResponse(response);
        this.resultLoading = false;
      });
    });
  }
}
