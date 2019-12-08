import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/address';
import { ZipPostalCodeLookupRequest } from '../models/zip-postal-code-lookup-request';
import { ZipPostalCodeLookupRequestWrapper } from '../models/zip-postal-code-lookup-request-wrapper';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZipPostalCodeLookupService {

  constructor(private http: HttpClient) { }

  zipcodeLookupUrl: string = environment.baseUrl + "api/zipcode-lookup";

  getZipcodeByAddress(address: Address): Observable<ZipPostalCodeLookupRequestWrapper> {
    let zipcodeLookupRequest = new ZipPostalCodeLookupRequest(address);
    let wrapper = new ZipPostalCodeLookupRequestWrapper(zipcodeLookupRequest);

    return this.http.post<ZipPostalCodeLookupRequestWrapper>(this.zipcodeLookupUrl, wrapper);
  } 
}
