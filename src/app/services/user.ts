import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly usersMockup = './assets/data/users.json';
  users: User[] = [];

  constructor() {
    fetch(this.usersMockup).then(res => res.json())
      .then(json => {
        this.users = json;
      });
  }

  public login(email: string, password: string): User | null {
    let aux = null;
    for (let user of this.users) {
      if (user.email === email && user.password === password) {
        aux = user;
        break;
      }
    }
    return aux;
  }
}
