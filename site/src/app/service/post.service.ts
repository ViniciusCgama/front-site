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

  pesquisarPostPorNome(nome: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/$posts?nome_like=${nome}`);
  }

  uploadPhoto(file: File, postId: number): Observable<Post> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('id', postId.toString());
    return this.http.post<Post>(`${this.baseUrl}/upload`, formData);
  }
}
