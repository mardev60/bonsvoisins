import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss'],
})
export class PageInfoComponent implements OnInit {
  // Informations du repas
  adress = '';
  city = '';
  coverImage = '';
  userImage = '';
  userName = '';
  dishName = '';
  timeRange = '';
  personnalizedMessage = '';
  commandId!: number;

  // État des affichages
  displayStates = {
    showSendMessage: false,
    showCodeBox: false,
    showCollectorGuide: false,
    showAuthorGuide: false,
    showCollectedCommand: false,
    showPersonnalizedMessage: false,
  };

  // Données de navigation et repas
  navigationData$!: Observable<string | null>;
  mealInfos: any;

  constructor(
    private router: Router,
    private store: Store<{ navigationData: string | null }>
  ) {}

  /**
   * - Récupère les données de navigation depuis le store NgRx.
   * - Vérifie si des données sont disponibles pour initialiser les informations de la page.
   * - Redirige l'utilisateur vers le dashboard si aucune donnée n'est trouvée.
   */
  ngOnInit(): void {
    this.navigationData$ = this.store.select('navigationData');
    this.navigationData$.subscribe((data) => {
      if (data) {
        this.mealInfos = data;
        this.initPageInfos();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Initialise les informations de la page en fonction des données du repas.
   * - Remplit les informations utilisateur, le plat et les dates de commande.
   * - Met à jour les états d'affichage en fonction de la disponibilité du repas.
   * - Gère les cas où le repas est collecté, expiré ou disponible.
   */
  initPageInfos(): void {
    if (this.mealInfos.from === 'collection') {
      const { meal, collectedat, id } = this.mealInfos;
      const { user, name, photo_url, collect_address, collect_city, date_start, date_end } = meal;

      this.userName = `${user.first_name} ${user.last_name}`;
      this.dishName = name;
      this.coverImage = photo_url;
      this.userImage = user.avatar;
      this.adress = collect_address;
      this.city = collect_city;
      this.commandId = id;
      this.timeRange = this.formatCommandDates(this.mealInfos);

      this.displayStates.showCollectorGuide = true;

      const now = new Date();
      if (new Date(date_start) < now && new Date(date_end) > now && !collectedat) {
        this.setDisplayState({ showSendMessage: true, showCodeBox: true });
      } else if (collectedat) {
        this.setDisplayState({ showCollectedCommand: true });
      } else if (new Date(date_end) < now) {
        this.handleExpiredMeal();
      }
    }
  }

  /**
   * Formate les dates de commande pour un affichage lisible.
   * - Si la commande a été collectée, retourne une date au format "jour/mois/année".
   * - Si la commande est encore disponible, retourne une plage horaire.
   * 
   * @param command - Les informations sur la commande à formater.
   * @returns Une chaîne contenant la date ou la plage horaire.
   */
  formatCommandDates(command: any): string {
    const { collectedat, meal } = command;
    if (collectedat) {
      return `Commande récupérée le ${this.formatDate(collectedat)}`;
    } else {
      return this.getTimeRange(meal.date_start, meal.date_end);
    }
  }

  /**
   * Retourne l'utilisateur à la page précédente en fonction de l'origine des données.
   * - Ex. Si les données proviennent de la collection, redirige vers le tableau de bord.
   */
  back(): void {
    if (this.mealInfos.from === 'collection') {
      this.router.navigate(['/dashboard/collecter']);
    }
  }

  private setDisplayState(states: Partial<typeof this.displayStates>): void {
    this.displayStates = { ...this.displayStates, ...states };
  }

  private handleExpiredMeal(): void {
    this.setDisplayState({
      showCollectorGuide: false,
      showPersonnalizedMessage: true,
    });
    this.timeRange = 'Expiré';
    this.personnalizedMessage =
      "Dommage... ! Le repas a expiré, tu n'as pas pu le récupérer à temps. N'hésite pas à consulter les autres repas disponibles sur l'application !";
  }

  private getTimeRange(start: string, end: string): string {
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    const startDate = new Intl.DateTimeFormat('fr-FR', optionsDate).format(new Date(start));
    const startTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(new Date(start));
    const endTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(new Date(end));

    return `À récupérer le ${startDate} entre ${startTime} et ${endTime}`;
  }

  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}