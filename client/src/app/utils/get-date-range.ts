import { DateRanges } from "../types/date-range.type";

export function getDateRanges() : DateRanges {
  const todayDate = new Date();
  
  const yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);

  const startOfWeek = new Date(todayDate);
  startOfWeek.setDate(todayDate.getDate() - todayDate.getDay()); // Lundi de la semaine

  const endOfWeek = new Date(todayDate);
  endOfWeek.setDate(todayDate.getDate() + (6 - todayDate.getDay()));  // Dimanche de la semaine

  const startOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1); // 1er jour du mois

  const startOfYear = new Date(todayDate.getFullYear(), 0, 1); // 1er jour de l'année
  const endOfYear = new Date(todayDate.getFullYear(), 11, 31); // 31 décembre de l'année

  return {
    todayDate,
    yesterdayDate,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    startOfYear,
    endOfYear
  }
}
