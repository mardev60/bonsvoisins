import { Component, Input, OnInit } from '@angular/core';
import { CommandsService } from '../../core/services/commands.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-page-info-content',
  templateUrl: './page-info-content.component.html',
})
export class PageInfoContentComponent implements OnInit {
  digit1 = '';
  digit2 = '';
  digit3 = '';
  digit4 = '';
  digit5 = '';

  @Input() showSendMessage: boolean = false;
  @Input() showCodeBox: boolean = false;
  @Input() showCollectorGuide: boolean = false;
  @Input() showAuthorGuide: boolean = false;
  @Input() showCollectedCommand: boolean = false;
  @Input() showPersonnalizedMessage: boolean = false;


  @Input() commandId!: number;
  @Input() userName: string = '';
  @Input() adress: string = '';
  @Input() city: string = '';
  @Input() personnalizedMessage: string = '';
  @Input() mealCode: string = '';

  isCodeLoading = false;
  showCodeError = false;

  constructor(private commandsService : CommandsService) {}

  ngOnInit(): void {

    if(this.mealCode){
      const digits = this.mealCode.toString().split('').map(Number);
      this.digit1 = digits[0].toString();
      this.digit2 = digits[1].toString();
      this.digit3 = digits[2].toString();
      this.digit4 = digits[3].toString();
      this.digit5 = digits[4].toString();
    }
  }


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
    this.showCodeError = false;
    const code = `${this.digit1}${this.digit2}${this.digit3}${this.digit4}${this.digit5}`;
    if (code.length === 5) {
      this.isCodeLoading = true;
      this.commandsService.validateCommand(this.commandId, code).pipe(
        catchError((error) => {
          this.showCodeError = true;
          this.isCodeLoading = false;
          return of(null);
        })
      ).subscribe((response) => {
        if (response) {
          this.showCodeBox = false;
          this.showCollectedCommand = true;
        } else {
          this.showCodeBox = true;
        }
        this.isCodeLoading = false;
      });
    }
  }
  
}