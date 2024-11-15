import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrl: './switch-button.component.scss',
  imports: [FormsModule]
})
export class SwitchButtonComponent {
  @Input() isChecked = false;
  @Output() isCheckedChange = new EventEmitter<boolean>();

  toggleChecked(event: Event) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.isCheckedChange.emit(this.isChecked);
  }
}
