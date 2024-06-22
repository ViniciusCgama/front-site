import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/$posts`);
  }

  postMensagem(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/$posts`, post);
  }

  buscarTopico(topic: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/$posts?topic=${topic}`);
  }


}
