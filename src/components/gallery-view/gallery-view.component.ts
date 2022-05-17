import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../services/image.interface';

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss'],
})
export class GalleryViewComponent implements OnInit {
  @Input() images: Image[] | null = [];

  constructor() {}

  ngOnInit(): void {}
}
