import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

export const MAX_OFFSET = new InjectionToken<number>(
  'Limitation of Giphy API',
  {
    providedIn: 'root',
    factory: () => 4999,
  }
);

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
  constructor(@Inject(PAGE_SIZE) public override pageSize: number) {
    super();
  }

  override ellipses = true;
  override maxSize = 5;
  override boundaryLinks = true;
  override directionLinks = true;
}
