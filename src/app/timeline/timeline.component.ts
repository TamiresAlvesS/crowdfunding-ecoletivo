import { PostagemService } from './../service/postagem.service';
import { AuthService } from './../service/auth.service';
import { Component, Input, OnInit} from '@angular/core';
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

  @Input() deleteOk: boolean = false
  postagem: Postagem = new Postagem()
  postagemEdit: Postagem = new Postagem();
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
    if(this.deleteOk){
      this.getAllPostagem()
    }
  }

  editarPostagem(postagem: Postagem){
    // environment.idPostagem = id;
    this.postagemEdit = postagem;
    console.log(this.postagemEdit)
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

/*   atualizar(){
    // Adicionar FormControl e obter o objeto atualizado...
    this.postagemService.putPostagem(this.postagemEdit).subscribe((resp: Postagem) => {
      alert("Projeto atualizado com sucesso!");
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.postagemEdit.id).subscribe(()=>{
      alert("Projeto excluído com sucesso!")
    })
  } */
}
