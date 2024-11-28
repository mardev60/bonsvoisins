import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrl: './page-info.component.scss'
})
export class PageInfoComponent implements OnInit {
  adress: string = '8 rue Lesiour';
  city: string = 'Montataire';
  coverImage: string = '../../../assets/meal2.png';
  userImage: string = 'https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp';
  userName: string = 'Utilisateur';
  dishName: string = 'Plat'; 
  timeRange: string = 'Plage horaire';

  showSendMessage: boolean = false;
  showCodeBox: boolean = true;
  showCollectorGuide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}