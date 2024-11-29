import { Component, OnInit } from '@angular/core';
import { CommandsService } from '../../core/services/commands.service';
import { GroupedCommands } from '../../types/db-entities.type';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  commandsToCollect: any[] = [];
  groupedCommands: GroupedCommands = {};

  constructor(private commandsService: CommandsService) {}

  ngOnInit(): void {
    this.fetchCommands();
  }

  private fetchCommands(): void {
    this.commandsService.getAllUserCommands().subscribe((res) => {
      this.commandsToCollect = res.map(this.mapCommandData.bind(this));
      this.groupCommandsByDate();
    });
  }

  private mapCommandData(command: any): any {
    return {
      id: command.id,
      name: command.meal.name,
      image: command.meal.photo_url,
      date_start: new Date(command.meal.date_start),
      date_end: new Date(command.meal.date_end),
      collectedAt: command.collectedat ? new Date(command.collectedat) : null,
      collect_status: this.getCollectStatus(command),
      created_at: new Date(command.createdAt),
      user: `${command.meal.user.last_name} ${command.meal.user.first_name}`,
    };
  }

  private getCollectStatus(command: any): string {
    const now = new Date();
    const dateEnd = new Date(command.meal.date_end);
    const dateStart = new Date(command.meal.date_start);

    if (command.collectedat) {
      return 'Déjà récupéré';
    }

    if (dateEnd < now && !command.collectedat) {
      return 'Repas expiré';
    }

    if (dateStart > now) {
      return 'Bientôt disponible';
    }

    return 'Disponible pour collecte';
  }

  private groupCommandsByDate(): void {
    const today = new Date();

    this.groupedCommands = this.commandsToCollect.reduce(
      (groups: GroupedCommands, command) => {
        const key = this.getDateGroupKey(command.created_at, today);

        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(command);
        return groups;
      },
      {}
    );
  }

  private getDateGroupKey(commandDate: Date, today: Date): string {
    const normalizedCommandDate = new Date(commandDate.getFullYear(), commandDate.getMonth(), commandDate.getDate());
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
    const daysDifference = Math.floor(
      (normalizedToday.getTime() - normalizedCommandDate.getTime()) / (1000 * 3600 * 24)
    );
  
    if (daysDifference === 0) {
      return "Aujourd'hui";
    } else if (daysDifference === 1) {
      return 'Hier';
    } else {
      return `Il y a ${daysDifference} jours`;
    }
  }  

  getGroupedCommandsKeys(): string[] {
    return Object.keys(this.groupedCommands);
  }

  onCommandSelected(command: any): void {
    console.log('Repas sélectionné:', command);
  }
}
