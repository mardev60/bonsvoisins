import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-info-header',
  templateUrl: './page-info-header.component.html',
  styleUrl: './page-info-header.component.scss'
})
export class PageInfoHeaderComponent {
  @Input() dishImage: string = '';
  @Input() userImage: string = '';
  @Input() userName: string = 'Utilisateur';
  @Input() dishName: string = 'Plat'; 
  @Input() timeRange: string = 'Plage horaire'; 
}
