import { Inject, Injectable } from '@angular/core';
import { GiphyService } from './giphy/giphy.service';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { GIFObject, MultiResponse } from 'giphy-api';
import { Image } from './image.interface';
import { MAX_OFFSET, PAGE_SIZE } from '../app/app.config';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  get collectionSize(): Observable<number> {
    return this.totalCount.asObservable();
  }
  private _search = new BehaviorSubject<string>('');
  private totalCount = new BehaviorSubject<number>(0);
  private _currentPage = new BehaviorSubject<number>(1);
  private _queryParams: Observable<{ search: string; offset: number }> =
    combineLatest([this._search, this._currentPage]).pipe(
      map(([search, page]) => {
        return {
          search,
          offset: this.pageSize * (page - 1),
        };
      }),
      distinctUntilChanged(
        (prev, curr) =>
          prev.offset === curr.offset && prev.search === curr.search
      )
    );
  constructor(
    private giphyService: GiphyService,
    @Inject(PAGE_SIZE) private pageSize: number,
    @Inject(MAX_OFFSET) private maxOffset: number,
    private http: HttpClient
  ) {}

  getImages(): Observable<Image[]> {
    return this._queryParams.pipe(
      switchMap(({ search, offset }) => {
        const url = search
          ? this.giphyService.getSearchUrl(search, offset, this.pageSize)
          : this.giphyService.getTrendingUrl(offset, this.pageSize);
        return this.http.get<MultiResponse>(url);
      }),
      tap(response => {
        this.totalCount.next(
          Math.min(this.maxOffset, response.pagination.total_count)
        );
      }),
      map(response => {
        return ImageService.mapGifObjectsToImages(response.data);
      })
    );
  }

  onPageChange(page: number): void {
    this._currentPage.next(page);
  }

  onSearch(searchTerm: string): void {
    this._search.next(searchTerm);
  }

  private static mapGifObjectsToImages(dto: GIFObject[]): Image[] {
    return dto.map(gif => {
      const { url, height, width } = gif.images.fixed_width_still;
      return { alt: gif.title, url, height, width };
    });
  }
}
