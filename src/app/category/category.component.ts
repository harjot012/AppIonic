import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../models/category';
import { WikiService } from '../services/wiki';  

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  standalone: false,
})
export class CategoryComponent  implements OnInit {

  @Input() theCategory = new Category();

  @Input() selected: boolean = false;
  
  @Output() clicked = new EventEmitter<string>();

  articles: any[] = [];

  constructor(private wikiSrv: WikiService) { }

  ngOnInit() {}

  click() {
    this.clicked.emit(this.theCategory.name);
    console.log("clicked on" + this.theCategory.name);
    this.getArticles(this.theCategory.name.toLowerCase());

  }

  getArticles(category: string) {
    this.wikiSrv.getAllArticles(category).subscribe(
      (result: any) => {
        this.articles = result.results;
      }
    );
  }

  generateURL(cat: string, id: string) {
    return "/tabs/wiki/article/" + cat.toLowerCase() + "/" + id;
  }

}
