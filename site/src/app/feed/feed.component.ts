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
  listPost: Post[] = [];
  pesquisaNome: string = '';
  post!: PostService;
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadPhoto(postId: number): void {
    if (this.selectedFile) {
      this.postService.uploadPhoto(this.selectedFile, postId).subscribe((updatedPost) => {
        const index = this.listPost.findIndex(post => post.id === postId);
        if (index !== -1) {
          this.listPost[index] = updatedPost;
        }
        this.selectedFile = null;
        this.selectedImage = null;
      });
    }
  }
}
