import { ZipCodeLookupRequest } from './zip-code-lookup-request';

export class ZipCodeLookupRequestWrapper {

  constructor(lookupRequest: ZipCodeLookupRequest) {
    this.requestXml = lookupRequest.request;
  }

  requestXml: string
}
