import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.scss'
})
export class ContatoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enviarContato(event: Event) {
    event.preventDefault()
    Swal.fire({
      title: "SUCESSO",
      text: "O SEU CONTATO FOI ENVIADO",
      icon: 'success'
    });
  }

}
