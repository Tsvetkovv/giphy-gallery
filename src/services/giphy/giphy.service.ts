import { Inject, Injectable, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export const API_KEY = new InjectionToken<string>('Giphy Api Key', {
  providedIn: 'root',
  factory: () => environment.giphyApiKey,
});
const BASE_URL = 'https://api.giphy.com/v1';
const GIF_TRENDING_URL = BASE_URL + '/gifs/trending';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(@Inject(API_KEY) private apiKey: string) {}

  getTrendingUrl(offset: number = 0, limit = 9): string {
    return `${GIF_TRENDING_URL}?api_key=${this.apiKey}&offset=${offset}&limit=${limit}`;
  }
}
