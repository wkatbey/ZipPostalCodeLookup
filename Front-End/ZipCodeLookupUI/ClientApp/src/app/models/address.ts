import { UsState } from './us-state';

export class Address {

  constructor(
    addressFirstLine: string, addressSecondLine: string,
    city: string, state: UsState, zipcode?: number) {

    this.addressFirstLine = addressFirstLine;
    this.addressSecondLine = addressSecondLine;
    this.city = city;
    this.state = state;

    if (zipcode)
      this.zipcode = zipcode;
  }

  addressFirstLine: string;
  addressSecondLine: string;
  city: string;
  state: UsState;
  zipcode?: number;
}
