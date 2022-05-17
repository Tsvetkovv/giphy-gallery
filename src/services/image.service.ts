import { Injectable } from '@angular/core';
import { GiphyService } from './giphy/giphy.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GIFObject, MultiResponse } from 'giphy-api';
import { Image } from './image.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  limit = 9;
  currentOffset = 0;
  constructor(private giphyService: GiphyService, private http: HttpClient) {}

  getTrendingImages(): Observable<Image[]> {
    return this.http
      .get<MultiResponse>(
        this.giphyService.getTrendingUrl(this.currentOffset, this.limit)
      )
      .pipe(
        map(response => {
          return ImageService.mapGifObjectsToImages(response.data);
        })
      );
  }

  private static mapGifObjectsToImages(dto: GIFObject[]): Image[] {
    return dto.map(gif => {
      const { url, height, width } = gif.images.fixed_height_still;
      return { alt: gif.title, url, height, width };
    });
  }
}
