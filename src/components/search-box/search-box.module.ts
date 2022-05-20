import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent],
  imports: [CommonModule, FormsModule],
})
export class SearchBoxModule {}
