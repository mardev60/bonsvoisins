/**
 * Récupère l'étiquette correspondant à une clé de groupe.
 * Si la clé n'est pas trouvée, renvoie 'Autres'.
 *
 * @param {string} key - La clé du groupe pour laquelle on souhaite obtenir l'étiquette.
 * @returns {string} - L'étiquette correspondante à la clé, ou 'Autres' si la clé n'est pas trouvée.
 */
export function getGroupLabel(key: string): string {
  const labels: { [key: string]: string } = {
    today: "Aujourd'hui",
    yesterday: "Hier",
    this_week: "Cette semaine",
    this_month: "Ce mois-ci",
    this_year: "Cette année",
    after_this_year: "Futurs plats",
  };

  return labels[key] || 'Autres';
}
