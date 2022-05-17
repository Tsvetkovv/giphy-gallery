import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryViewComponent } from './gallery-view.component';

@NgModule({
  declarations: [GalleryViewComponent],
  exports: [GalleryViewComponent],
  imports: [CommonModule],
})
export class GalleryViewModule {}
