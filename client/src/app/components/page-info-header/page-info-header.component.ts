import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-info-header',
  templateUrl: './page-info-header.component.html'
})
export class PageInfoHeaderComponent {
  @Input() coverImage: string = '';
  @Input() userImage: string = '';
  @Input() userName: string = '';
  @Input() dishName: string = ''; 
  @Input() timeRange: string = ''; 
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  back(){
    this.goBack.emit();
  }
}