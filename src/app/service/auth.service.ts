import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/UserLogin';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${environment.server}/usuario/logar`, userLogin)
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>(`${environment.server}/usuario/cadastrar`, user)
  }
  atualizar(user: User): Observable<User>{
    return this.http.put<User>(`${environment.server}/usuario/cadastrar`, user)
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.server}/usuario/${id}`)
  }

  logado(){
    let ok: boolean = false;

    if(environment.token != ''){
      ok = true;
    }

    return ok;
  }

  adm() {
    let ok: boolean = false;

    if(environment.tipo == 'admin'){
      ok = true;
    }

    return ok;
  }
}
