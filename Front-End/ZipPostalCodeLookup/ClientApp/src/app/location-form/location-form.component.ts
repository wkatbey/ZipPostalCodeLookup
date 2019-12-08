import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../models/address';
import { UsState } from '../models/us-state';
import { ZipPostalCodeLookupService } from '../services/zip-postal-code-lookup.service';
import { ZipPostalCodeLookupResponse } from '../models/zip-postal-code-lookup-response';
import { UsStateService } from '../services/us-state.service';
import { Subscription, Observable } from 'rxjs';
import { LocationValidator } from './validators/location-validator';


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
      state: ['', Validators.required],
      zipcode: [''],
    },
    {
      asyncValidators: LocationValidator.locationExists(this.ZipPostalCodeLookupService),
      updateOn: 'blur'
    }
  );

  statesSubscription: Subscription;
  states$: Observable<UsState[]>;
  states: UsState[];

  constructor(
    private fb: FormBuilder,
    private stateService: UsStateService,
    private ZipPostalCodeLookupService: ZipPostalCodeLookupService) {}

  ngOnInit() {
    this.statesSubscription = this.stateService.getStates().subscribe(states => {
      this.states = states;
    });
  }

  ngOnDestroy() {
    this.statesSubscription.unsubscribe();
  }

  getZipcodeByAddress() {
    let locationForm = this.locationForm;
    let locationFormValue = locationForm.value;

    let address = new Address(
      locationFormValue.addressFirstLine,
      locationFormValue.addressSecondLine,
      locationFormValue.city,
      locationFormValue.state
    );

    if ((address.addressFirstLine || address.addressSecondLine)
      && address.city && address.state) {


      return this.ZipPostalCodeLookupService.getZipcodeByAddress(address).subscribe(response => {
        let zipcode = new ZipPostalCodeLookupResponse(response).zipcode;

        locationForm.patchValue({ 'zipcode': zipcode });
      });
    }
  }

}
