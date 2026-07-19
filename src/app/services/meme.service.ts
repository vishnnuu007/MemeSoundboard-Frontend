import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meme } from '../models/meme';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  private apiUrl = 'https://memesound.runasp.net/api/Meme';

  constructor(private http: HttpClient) { }

  getAllMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.apiUrl);
  }

  getMemeById(id: number): Observable<Meme> {
    return this.http.get<Meme>(`${this.apiUrl}/${id}`);
  }

  createMeme(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }

  updateMeme(id: number, formData: FormData) {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteMeme(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  likeMeme(id: number) {

  return this.http.post(

    `${this.apiUrl}/${id}/like`,
    {}

  );

}

unlikeMeme(id: number) {

  return this.http.post(

    `${this.apiUrl}/${id}/unlike`,
    {}

  );

}

playMeme(id:number){

  return this.http.post(

    `${this.apiUrl}/${id}/play`,
    {}

  );

}

}