import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe Angular qui formate les dates de début et de fin en une chaîne lisible pour l'utilisateur.
 * Si l'une des dates est absente, retourne "Date non disponible".
 *
 * Usage :
 * - Template : {{ dateStart | formatDateTime: dateEnd }}
 * - Retour : "À récupérer le 1 décembre 2024 entre 14:00 et 16:00"
 */
@Pipe({
  name: 'formatDateTime'
})
export class FormatDateTimePipe implements PipeTransform {
  transform(dateStart: string | null, dateEnd: string | null): string {
    if (!dateStart || !dateEnd) {
      return 'Date non disponible';
    }

    const optionsDate: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const formattedDate = start.toLocaleDateString('fr-FR', optionsDate);
    const startTime = start.toLocaleTimeString('fr-FR', optionsTime);
    const endTime = end.toLocaleTimeString('fr-FR', optionsTime);

    return `À récupérer le ${formattedDate} entre ${startTime} et ${endTime}`;
  }
}
