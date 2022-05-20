import { Inject, Injectable } from '@angular/core';
import { API_KEY_TOKEN } from '../../app/app.config';
import { HttpParams } from '@angular/common/http';

const BASE_URL = 'https://api.giphy.com/v1';
const GIF_TRENDING_URL = BASE_URL + '/gifs/trending';
const GIF_SEARCH_URL = BASE_URL + '/gifs/search';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(@Inject(API_KEY_TOKEN) private apiKey: string) {}

  getTrendingUrl(offset: number, limit: number): string {
    const query = this.getParams(offset, limit).toString();
    return `${GIF_TRENDING_URL}?${query}`;
  }

  getSearchUrl(search: string, offset: number, limit: number): string {
    const query = this.getParams(offset, limit, search).toString();
    return `${GIF_SEARCH_URL}?${query}`;
  }

  private getParams(offset: number, limit: number, q?: string): HttpParams {
    const params = new HttpParams({
      fromObject: { api_key: this.apiKey, offset, limit },
    });
    if (q) {
      return params.append('q', q);
    }
    return params;
  }
}
