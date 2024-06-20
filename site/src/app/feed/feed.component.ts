import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Post } from '../model/Post';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  postForm: FormGroup;
  topics: string[] = [
    'Java',
    'JavaScript',
    'C',
    'C#',
    'C++',
    'PHP',
    'Python',
    'Angular',
    'Kotlin',
    'Banco de dados',
    'HTML',
    'CSS',
    'GIT',
    'Outros'
  ];
  listPost: Post[] = [];
  pesquisaNome: string = '';
  post!: PostService;
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      topic: ['', Validators.required],
      nome: ['Vinicius', [Validators.required, Validators.minLength(2)]],
      mensagem: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10000)]]
    });
  }

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.listPost = data;
    });
  }

  cadastrarMensagem() {
    const post = this.postForm.value;
    this.postService.postMensagem(post).subscribe((newPost: Post) => {
      this.listPost.unshift(newPost);
      this.postForm.patchValue({ mensagem: '' });
      this.selectedImage = null;
      console.log(this.postForm.value);
      this.postForm.reset();
    });
  }

  pesquisarPostPorNome() {
    if (this.pesquisaNome.trim().length > 0) {
      this.postService.pesquisarPostPorNome(this.pesquisaNome).subscribe((resp: Post[]) => {
        this.listPost = resp;
      });
    } else {
      this.findPosts();
    }
  }
}
