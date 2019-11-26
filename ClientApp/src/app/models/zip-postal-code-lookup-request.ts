import { UsState } from './us-state';
import { Address } from './address';

export class ZipPostalCodeLookupRequest {
  constructor(address: Address) {
    this.request = `
            <ZipCodeLookupRequest USERID=\"${this.userId}\">
                <Address ID=\"0\">
                    <Address1>${address.addressFirstLine}</Address1>
                    <Address2>${address.addressSecondLine}</Address2>
                    <City>${address.city}</City>
                    <State>${address.state.abbreviation}</State>
                </Address>
            </ZipCodeLookupRequest> 
        `;
  }

  request: string;
  userId: string = '333SAPPH3353';
}
