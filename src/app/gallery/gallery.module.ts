import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxModule } from '../../components/search-box/search-box.module';
import { GalleryViewModule } from '../../components/gallery-view/gallery-view.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from './gallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GalleryComponent],
  exports: [GalleryComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SearchBoxModule,
    GalleryViewModule,
    NgbPaginationModule,
    FormsModule,
  ],
})
export class GalleryModule {}
