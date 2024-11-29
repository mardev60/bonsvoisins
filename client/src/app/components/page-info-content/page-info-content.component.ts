import { Component, Input } from '@angular/core';
import { CommandsService } from '../../core/services/commands.service';

@Component({
  selector: 'app-page-info-content',
  templateUrl: './page-info-content.component.html',
  styleUrls: ['./page-info-content.component.scss'],
})
export class PageInfoContentComponent {
  digit1 = '';
  digit2 = '';
  digit3 = '';
  digit4 = '';
  digit5 = '';

  @Input() showSendMessage: boolean = false;
  @Input() showCodeBox: boolean = false;
  @Input() showCollectorGuide: boolean = false;
  @Input() showAuthorGuide: boolean = false;
  showCollectedCommand: boolean = false;


  @Input() commandId!: number;
  @Input() userName: string = '';
  @Input() adress: string = '';
  @Input() city: string = '';

  constructor(private commandsService : CommandsService) {}


  updateValue(digit: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    (this as any)[digit] = value;
  
    if (value.length === 1) {
      const currentIndex = parseInt(digit.replace('digit', ''), 10);
      const nextIndex = currentIndex + 1;
  
      const nextField = document.querySelector(`input[name="digit${nextIndex}"]`) as HTMLInputElement;
      nextField?.focus();
    }
  }

  handleKeydown(event: KeyboardEvent, digit: string) {
    const input = event.target as HTMLInputElement;
  
    if (event.key === 'Backspace' && input.value.length === 0) {
      const currentIndex = parseInt(digit.replace('digit', ''), 10);
      const prevIndex = currentIndex - 1;
  
      const prevField = document.querySelector(`input[name="digit${prevIndex}"]`) as HTMLInputElement;
      prevField?.focus();
    }
  }

  submitCode() {
    const code = `${this.digit1}${this.digit2}${this.digit3}${this.digit4}${this.digit5}`;
    if (code.length === 5) {
      this.commandsService.validateCommand(this.commandId, code).subscribe( response => {
        if(response){
          this.showCodeBox = false;
          this.showCollectedCommand = true;
        } else {

        }

      });
    } else {
      alert('Remplissez tous les champs');
    }
  }
}