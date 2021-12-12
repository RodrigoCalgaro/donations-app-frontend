import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../interfaces/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private http: HttpClient
  ) { }
  
  getAll(filter: string, pageNumer: number, pageSize: number, sorterBy: string, sorterDirection: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/donations/?filter=${filter}&pageNumber=${pageNumer}&pageSize=${pageSize}&sorterBy=${sorterBy}&sorterDirection=${sorterDirection}`, { observe: "response"})
  }

  get(id: number): Observable<Donation> {
    return this.http.get<Donation>(`${environment.apiUrl}/donations/${id}`)
  }

  add(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${environment.apiUrl}/donations`, donation)
  }

  update(id: number, donation: Donation): Observable<Donation> {
    return this.http.put<Donation>(`${environment.apiUrl}/donations/${id}`, donation)
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/donations/${id}`)
  }
}
