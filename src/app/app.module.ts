import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBoxModule } from '../components/search-box/search-box.module';
import { GalleryViewModule } from '../components/gallery-view/gallery-view.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SearchBoxModule,
    GalleryViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
