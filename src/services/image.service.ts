import { Inject, Injectable } from '@angular/core';
import { GiphyService } from './giphy/giphy.service';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { GIFObject, MultiResponse } from 'giphy-api';
import { Image } from './image.interface';
import { PAGE_SIZE } from '../app/app.config';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  search$ = new BehaviorSubject<string>('');
  collectionSize$ = new BehaviorSubject<number>(0);
  currentPage$ = new BehaviorSubject<number>(1);
  constructor(
    private giphyService: GiphyService,
    @Inject(PAGE_SIZE) private pageSize: number,
    private http: HttpClient
  ) {}

  getTrendingImages(): Observable<Image[]> {
    return combineLatest([this.search$, this.currentPage$]).pipe(
      switchMap(([searchTerm, currentPage]) => {
        return this.http.get<MultiResponse>(
          this.giphyService.getTrendingUrl(
            this.pageSize * (currentPage - 1),
            this.pageSize
          )
        );
      }),
      tap(response => {
        this.collectionSize$.next(response.pagination.total_count);
      }),
      map(response => {
        return ImageService.mapGifObjectsToImages(response.data);
      })
    );
  }

  onPageChange(page: number): void {
    this.currentPage$.next(page);
  }

  onSearch(searchTerm: string): void {
    this.search$.next(searchTerm);
  }

  private static mapGifObjectsToImages(dto: GIFObject[]): Image[] {
    return dto.map(gif => {
      const { url, height, width } = gif.images.fixed_width_still;
      return { alt: gif.title, url, height, width };
    });
  }
}
