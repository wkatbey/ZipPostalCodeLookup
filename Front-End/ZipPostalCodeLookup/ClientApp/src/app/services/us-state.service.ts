import { Injectable } from '@angular/core';
import { UsState } from '../models/us-state';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsStateService {

  private usStatesUrl = "https://gist.githubusercontent.com"
    + "/mshafrir/2646763/raw/8b0dbb93521f"
    + "5d6889502305335104218454c2bf/states_titlecase.json";

  constructor(private http: HttpClient) {
  }

  getStates(): Observable<UsState[]> {
    return this.http.get<UsState[]>(this.usStatesUrl);
  }
}
