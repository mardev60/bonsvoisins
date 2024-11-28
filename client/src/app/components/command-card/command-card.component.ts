import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-command-card',
  templateUrl: './command-card.component.html',
})
export class CommandCardComponent {
  @Input() command: any;
  @Output() commandClick: EventEmitter<any> = new EventEmitter<any>();

  onCardClick(): void {
    this.commandClick.emit(this.command);
  }
}