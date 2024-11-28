/**
* Vérifie si deux dates correspondent au même jour.
* @param date1 - Première date sous forme de chaîne ou d'objet `Date`.
* @param date2 - Deuxième date sous forme d'objet `Date`.
* @returns boolean - True si les deux dates correspondent au même jour, sinon False.
*/
export function isSameDay(date1: string | Date, date2: Date): boolean {
 const d1 = new Date(date1);
 return (
   d1.getFullYear() === date2.getFullYear() &&
   d1.getMonth() === date2.getMonth() &&
   d1.getDate() === date2.getDate()
 );
}