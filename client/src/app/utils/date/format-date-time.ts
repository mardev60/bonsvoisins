/**
 * Formate les dates de début et de fin en une chaîne lisible pour l'utilisateur.
 * Si l'une des dates est manquante, retourne un message indiquant que la date n'est pas disponible.
 *
 * @param {string | null} dateStart - La date de début de l'événement.
 * @param {string | null} dateEnd - La date de fin de l'événement.
 * @returns {string} - La chaîne formatée avec les dates et heures, ou un message d'erreur.
 */
export function formatDateTime(dateStart: string | null, dateEnd: string | null): string {
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
