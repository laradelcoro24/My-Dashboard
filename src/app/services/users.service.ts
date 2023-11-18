import { Injectable, signal, inject, computed } from '@angular/core';
import { User, UserResponse, UsersResponse } from '../interfaces/req-response.interface';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs';

interface State{
  users: User[],
  loading:  boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient= inject(HttpClient)

  #state = signal<State>({
    loading: true,
    users:[]
  })
  public users = computed( () => this.#state().users );
  public loading = computed( () => this.#state().loading );


  constructor() {

    this.httpClient.get<UsersResponse>('https://reqres.in/api/users')
    .pipe(delay(1500))
    .subscribe(resp=> {
      this.#state.set({
        loading: false,
        users: resp.data
      })
    })

  }
  getUserById( id: string ) {
    return this.httpClient.get<UserResponse>(`https://reqres.in/api/users/${ id }`)
      .pipe(
        delay(1500),
        map( resp => resp.data )
      )

  }

}
