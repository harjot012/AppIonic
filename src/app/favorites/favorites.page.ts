import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {

  favorites: any[] = [];

  constructor(private storageSrv: StorageService) { }

  ngOnInit(): void {
    this.storageSrv.get('favorites').then((data: any) => {
      this.favorites = data ?? [];

    });
  }


  generateURL(cat: string, id: string): string {
    return "/tabs/wiki/article/" + cat + "/" + id;
  }

}
