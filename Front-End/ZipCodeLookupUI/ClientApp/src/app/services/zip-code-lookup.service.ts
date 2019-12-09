import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from '../models/address';
import { ZipCodeLookupRequest } from '../models/zip-code-lookup-request';
import { ZipCodeLookupRequestWrapper } from '../models/zip-code-lookup-request-wrapper';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZipCodeLookupService {

  constructor(private http: HttpClient) { }

  zipcodeLookupUrl: string = environment.baseUrl + "api/zipcode-lookup";

  getZipcodeByAddress(address: Address): Observable<ZipCodeLookupRequestWrapper> {
    let zipcodeLookupRequest = new ZipCodeLookupRequest(address);
    let wrapper = new ZipCodeLookupRequestWrapper(zipcodeLookupRequest);

    return this.http.post<ZipCodeLookupRequestWrapper>(this.zipcodeLookupUrl, wrapper);
  } 
}
