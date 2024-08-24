import { FormControl } from '@angular/forms';

export interface Carriage {
  code?: string;
  name?: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

export interface CarriageForm {
  code?: FormControl<string>;
  name?: FormControl<string>;
  rows: FormControl<number>;
  leftSeats: FormControl<number>;
  rightSeats: FormControl<number>;
}
