import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiService } from '../services/wiki';
import { StorageService } from '../services/storage';
import { People } from '../models/people';
import { Planet } from '../models/planet';
import { Species } from '../models/species';
import { Starship } from '../models/starship';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: false,
})
export class ArticlePage implements OnInit {

  title: string = '';
  id: string = '';
  category: string = '';

  people: People = new People();
  planet: Planet = new Planet();
  species: Species = new Species();
  starship: Starship = new Starship();

  public isFavorite: boolean = false;
  private favorites: any[] = [];

  constructor(private route: ActivatedRoute, private srv: WikiService, private storageSrv: StorageService, private toastController: ToastController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    this.category = (this.route.snapshot.paramMap.get('cat') ?? '').toLowerCase();
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.storageSrv.get('favorites').then((data: any) => {
      this.favorites = data ?? [];
      const aux = this.favorites.find((f: any) => f.id === this.id && f.category === this.category);
      if (aux != null) {
        this.isFavorite = true;
      }
    });

    this.srv.getArticle(this.category, this.id).subscribe(
      (result: any) => {
        switch (this.category) {
          case "people":
            Object.assign(this.people, result.result.properties);
            this.title = this.people.name;
            break;
          case "planet":
          case "planets":
            Object.assign(this.planet, result.result.properties);
            this.title = this.planet.name;
            break;
          case "starship":
          case "starships":
            Object.assign(this.starship, result.result.properties);
            this.title = this.starship.name;
            break;
          case "species":
            Object.assign(this.species, result.result.properties);
            this.title = this.species.name;
            break;
        }
      }
    );
  }


  toggleFavorite() {
    var theName:string = "";
    if (this.isFavorite){
      this.isFavorite = false;
      var aux = this.favorites.findIndex(f=> {
        return f.id === this.id && f.category === this.category;
      });
      if (aux >= 0) {
        this.favorites.splice(aux, 1);
      }
      this.storageSrv.set('favorites', this.favorites);
      this.presentToast("Article removed from favorites");
    } else {
      this.isFavorite = true;
      switch (this.category) {
        case "people":
          theName = this.people.name;
          break;
        case "planet":
        case "planets":
          theName = this.planet.name;
          break;
        case "starship":
        case "starships":
          theName = this.starship.name;
          break;
        case "species":
          theName = this.species.name;
          break;
      }
      this.favorites.push({category: this.category, id: this.id, title: theName});
      this.storageSrv.set('favorites', this.favorites);
      this.presentToast("Article stored as favorite");
    }
  }

}
