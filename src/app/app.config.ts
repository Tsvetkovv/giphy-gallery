import { Injectable, InjectionToken } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

export const PAGE_SIZE = new InjectionToken<number>('Gallery Page Size', {
  providedIn: 'root',
  factory: () => 9,
});

export const API_KEY_TOKEN = new InjectionToken<string>('Giphy Api Key', {
  providedIn: 'root',
  factory: () => environment.giphyApiKey,
});

@Injectable()
export class AppNgbPaginationConfig extends NgbPaginationConfig {
  override ellipses = true;
  override maxSize = 5;
}
