import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Observable } from 'rxjs';
import { Image } from '../services/image.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  images$: Observable<Image[]> = this.imageService.getTrendingImages();

  constructor(private imageService: ImageService) {}
}
