/**
 * Génère les plages de dates importantes : aujourd'hui, hier, début et fin de la semaine, 
 * début et fin du mois, et début et fin de l'année.
 *
 * @returns {DateRanges} - Un objet contenant les différentes plages de dates.
 */
import { DateRanges } from "../../types/date-range.type";

export function getDateRanges() : DateRanges {
  const todayDate = new Date();

  const yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);

  const startOfWeek = new Date(todayDate);
  startOfWeek.setDate(todayDate.getDate() - (todayDate.getDay() === 0 ? 6 : todayDate.getDay() - 1)); // Ajuste pour que lundi soit le début
  const endOfWeek = new Date(todayDate);
  endOfWeek.setDate(todayDate.getDate() + (7 - todayDate.getDay())); // Ajuste pour dimanche

  const startOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
  const endOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0);

  const startOfYear = new Date(todayDate.getFullYear(), 0, 1);
  const endOfYear = new Date(todayDate.getFullYear(), 11, 31);

  return {
    todayDate,
    yesterdayDate,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
  }
}
