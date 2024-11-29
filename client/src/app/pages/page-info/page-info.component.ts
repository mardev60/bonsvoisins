import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrl: './page-info.component.scss',
})
export class PageInfoComponent implements OnInit {
  // Variables pour afficher les informations du repas
  adress: string = '';
  city: string = '';
  coverImage: string = '';
  userImage: string = '';
  userName: string = '';
  dishName: string = '';
  timeRange: string = '';
  personnalizedMessage: string = '';
  commandId!: number;

  // Variables pour afficher les différentes parties de la page
  showSendMessage: boolean = false;
  showCodeBox: boolean = false;
  showCollectorGuide: boolean = false;
  showAuthorGuide: boolean = false;
  showCollectedCommand: boolean = false;
  showPersonnalizedMessage: boolean = false;

  // Variables pour gérer les informations
  navigationData$!: Observable<string | null>;
  mealInfos: any;

  constructor(
    private router: Router,
    private store: Store<{ navigationData: string | null }>
  ) {}

  ngOnInit(): void {
    this.navigationData$ = this.store.select('navigationData');
    this.navigationData$.subscribe((data) => {
      if (data) {
        console.log(data);
        this.mealInfos = data;
      } else {
        this.router.navigate(['/']);
      }
    });
    this.initPageInfos();
  }

  initPageInfos(): void {
    if (this.mealInfos.from == 'collection') {
      this.userName = `${this.mealInfos.meal.user.first_name} ${this.mealInfos.meal.user.last_name}`;
      this.dishName = this.mealInfos.meal.name;
      this.coverImage = this.mealInfos.meal.photo_url;
      this.timeRange = this.formatCommandDates(this.mealInfos);
      this.userImage = this.mealInfos.meal.user.avatar;
      this.adress = this.mealInfos.meal.collect_address;
      this.city = this.mealInfos.meal.collect_city;
      this.commandId = this.mealInfos.id;

      this.showCollectorGuide = true;

      // Si le repas est disponible pour être récupéré
      if (
        new Date(this.mealInfos.meal.date_start) < new Date() &&
        new Date(this.mealInfos.meal.date_end) > new Date() &&
        !this.mealInfos.collectedat
      ) {
        this.showSendMessage = true;
        this.showCodeBox = true;
      } else if (this.mealInfos.collectedat) {
        this.showCodeBox = false;
        this.showCollectorGuide = false;
        this.showSendMessage = false;
        this.showCollectedCommand = true;
      } else if (new Date(this.mealInfos.meal.date_end) < new Date()) {
        this.showCollectorGuide = false;
        this.showPersonnalizedMessage = true;
        this.timeRange = 'Expiré';
        this.personnalizedMessage =
          "Dommage... ! Le repas a expiré, tu n'as pas pu le récupérer à temps. N'hésite pas à consulter les autres repas disponibles sur l'application !";
      }
    }
  }

  formatCommandDates(command: any): string {
    if (command.collectedat) {
      return (
        'Commande récupérée le ' +
        new Date(command.collectedat).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
    } else {
      let date_start = new Date(command.meal.date_start);
      let date_end = new Date(command.meal.date_end);

      const optionsTime: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
      };
      const optionsDate: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };

      const startTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(
        date_start
      );
      const startDate = new Intl.DateTimeFormat('fr-FR', optionsDate).format(
        date_start
      );
      const endTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(
        date_end
      );

      return `À récupérer le ${startDate} entre ${startTime} et ${endTime}`;
    }
  }

  back(): void {
    if (this.mealInfos.from == 'collection') {
      this.router.navigate(['/dashboard/collecter']);
    }
  }
}
