import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateStart = control.get('date_start')?.value;
    const dateEnd = control.get('date_end')?.value;

    if (!dateStart || !dateEnd) {
      return null;
    }

    const start = new Date(dateStart).getTime();
    const end = new Date(dateEnd).getTime();
    const now = new Date().getTime();

    if (start < now) {
      return { dateRangeInvalid: 'La date de début doit être ultérieure.' };
    }

    if (start > end) {
      return {
        dateRangeInvalid: 'La date de début doit être avant la date de fin.',
      };
    }

    const diffInHours = (end - start) / (1000 * 60 * 60);
    if (diffInHours > 16) {
      return {
        dateRangeInvalid:
          "L'écart entre les dates ne peut pas dépasser 16 heures.",
      };
    }

    return null;
  };
}
