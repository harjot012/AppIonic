import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  private readonly API_URL = "https://swapi.tech/api/"

  constructor(private http: HttpClient) {}

  getAllArticles(category: string): Observable<any> {
    return this.http.get<any>(
      this.API_URL + category+"/"
    );
  }

  getArticle(category: string, uid: string): Observable<any> {
    return this.http.get<any>(
      this.API_URL + category + "/" + uid
    );
  }
  
}
