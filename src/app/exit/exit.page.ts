import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.page.html',
  styleUrls: ['./exit.page.scss'],
  standalone: false,
})
export class ExitPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeApp() {
    alert('No se puede cerrar la app desde la versión web.');
  }

  goToWiki() {
    this.router.navigateByUrl('/tabs/wiki');
  }

}
