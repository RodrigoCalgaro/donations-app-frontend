import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collect } from '../interfaces/collect';

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Collect> {
    return this.http.get<Collect>(`${environment.apiUrl}/collects`)
  }

  update(collect: Collect): Observable<Collect> {
    return this.http.put<Collect>(`${environment.apiUrl}/collects`, collect)
  }
}
