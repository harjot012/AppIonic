import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  readonly menuFile = '../assets/data/menu.json';
  menuOptions=[];

  constructor(private toastController: ToastController) {
  
  }

  async ngOnInit() {
    this.getMenu();
  }

  getMenu(){
    fetch(this.menuFile).then(res => res.json())
      .then(json => {
        this.menuOptions = json;
        console.log(this.menuOptions);
      });
  }
}
