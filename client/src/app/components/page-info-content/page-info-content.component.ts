import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-info-content',
  templateUrl: './page-info-content.component.html',
  styleUrls: ['./page-info-content.component.scss'],
})
export class PageInfoContentComponent {
  codeInputs: string[] = ['', '', '', '', ''];

  @Input() showSendMessage: boolean = true;
  @Input() showCodeBox: boolean = true;
  @Input() showCollectorGuide: boolean = false;

  /**
   * Passe automatiquement au champ suivant ou précédent
   * @param index Index de l'input actuel
   * @param event Événement de saisie
   */
  moveToNext(index: number, event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Si un chiffre a été entré, passe au champ suivant
    if (value.length === 1) {
      if (index < this.codeInputs.length - 1) {
        const nextInput = input.nextElementSibling as HTMLInputElement;
        nextInput?.focus();
      }
    } else if (value.length === 0 && index > 0) {
      // Si la case est effacée, passe au champ précédent
      const prevInput = input.previousElementSibling as HTMLInputElement;
      prevInput?.focus();
    }

    // Mettez à jour la valeur du champ
    this.codeInputs[index] = value;
  }


  /**
   * Soumet le code complet
   */
  submitCode() {
    const code = this.codeInputs.join('');
    if (code.length === 5) {
      console.log('Code complet:', code);
    } else {
      console.log('Veuillez entrer un code complet.');
    }
  }
}
