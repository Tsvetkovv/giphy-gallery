import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppNgbPaginationConfig } from './app.config';
import { GalleryModule } from './gallery/gallery.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, GalleryModule],
  providers: [
    { provide: NgbPaginationConfig, useClass: AppNgbPaginationConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
