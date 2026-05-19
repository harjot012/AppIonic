import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  formLogin: any;
  error: string = '';

  constructor(private fb: FormBuilder, private router: Router, private userSrv: UserService, private menuController: MenuController) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false, 'principal');
  }

  doLogin() {
    let email = this.formLogin.get('email').value;
    let password = this.formLogin.get('password').value;

    let user = this.userSrv.login(email, password);

    if (user != null) {
      this.router.navigateByUrl('/tabs');
    } else {
      this.error = "Error, credenciales incorrectas";
    }
  }

}