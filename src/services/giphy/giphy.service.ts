import { Inject, Injectable } from '@angular/core';
import { API_KEY_TOKEN } from '../../app/app.config';

const BASE_URL = 'https://api.giphy.com/v1';
const GIF_TRENDING_URL = BASE_URL + '/gifs/trending';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(@Inject(API_KEY_TOKEN) private apiKey: string) {}

  getTrendingUrl(offset: number = 0, limit = 9): string {
    return `${GIF_TRENDING_URL}?api_key=${this.apiKey}&offset=${offset}&limit=${limit}`;
  }
}
