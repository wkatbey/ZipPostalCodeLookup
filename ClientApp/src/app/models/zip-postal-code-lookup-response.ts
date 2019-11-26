import { NgxXml2jsonService } from 'ngx-xml2json';
import { ZipPostalCodeLookupRequestWrapper } from '../models/zip-postal-code-lookup-request-wrapper';

export class ZipPostalCodeLookupResponse {

  xmlToJson: NgxXml2jsonService = new NgxXml2jsonService();

  constructor(response: ZipPostalCodeLookupRequestWrapper) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.requestXml, 'text/xml');

    let jsonResponse: any = this.xmlToJson.xmlToJson(xml);

    this.zipcode = jsonResponse.ZipCodeLookupResponse.Address.Zip5;
  }

  zipcode: number;
  postalCode: number;
}
