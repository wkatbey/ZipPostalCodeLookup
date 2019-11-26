import { ZipPostalCodeLookupRequest } from './zip-postal-code-lookup-request';

export class ZipPostalCodeLookupRequestWrapper {

  constructor(lookupRequest: ZipPostalCodeLookupRequest) {
    this.requestXml = lookupRequest.request;
  }

  requestXml: string
}
