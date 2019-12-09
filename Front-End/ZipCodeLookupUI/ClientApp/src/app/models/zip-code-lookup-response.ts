import { NgxXml2jsonService } from 'ngx-xml2json';
import { ZipCodeLookupRequestWrapper } from '../models/zip-code-lookup-request-wrapper';

export class ZipCodeLookupResponse {

  xmlToJson: NgxXml2jsonService = new NgxXml2jsonService();

  constructor(response: ZipCodeLookupRequestWrapper) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.requestXml, 'text/xml');

    let jsonResponse: any = this.xmlToJson.xmlToJson(xml);

    let zip5 = jsonResponse.ZipCodeLookupResponse.Address.Zip5;
    let zip4 = jsonResponse.ZipCodeLookupResponse.Address.Zip4;

    this.zipcode = zip5 + ' - ' + zip4;
  }

  zipcode: string;
}
