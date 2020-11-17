import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  readonly URL_API = 'http://localhost:3000/api/mensaje';

  constructor(private http: HttpClient) { }

  post(mensaje: string) {
    return this.http.post(this.URL_API + '/post', { mensaje }, { withCredentials: true });
  }

  feedback(params: any){
    return this.http.post(this.URL_API + '/feedback', { params }, { withCredentials: true });
  }
}
