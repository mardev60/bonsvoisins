import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-command-group',
  templateUrl: './command-group.component.html',
})
export class CommandGroupComponent {
  @Input() groupName!: string;
  @Input() commands!: any[];
  @Output() commandSelected: EventEmitter<any> = new EventEmitter<any>();

  onCommandClick(command: any): void {
    this.commandSelected.emit(command);
  }
}