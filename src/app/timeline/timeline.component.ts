import { PostagemService } from './../service/postagem.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ""){
      this.router.navigate(['/entrar'])
    }

    this.getAllPostagem()
  }

  editarPostagem(id: number){
    environment.idPostagem = id;
  }

getAllPostagem(){
  this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
    this.listaPostagens = resp
  })
}
findByUser(){
  this.authService.getByIdUser(this.idUser).subscribe((resp: User) =>{
    this.user = resp
  })
}
}
