import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WikiPageRoutingModule } from './wiki-routing.module';

import { WikiPage } from './wiki.page';

import { CategoryComponent } from '../category/category.component';

import { WikiService } from '../services/wiki';
import {HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WikiPageRoutingModule,
    HttpClientModule
  ],
  providers: [WikiService],
  declarations: [WikiPage, CategoryComponent]
})
export class WikiPageModule {}
