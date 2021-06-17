import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css'],
})
export class ChipInputComponent {
  @Input() chips: string[];
  @Output() addChip = new EventEmitter();
  @Output() deleteChip = new EventEmitter();
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addChip.emit(value);
    }

    event.input.value = '';
  }

  remove(chip: string): void {
    this.deleteChip.emit(chip);
  }
}
