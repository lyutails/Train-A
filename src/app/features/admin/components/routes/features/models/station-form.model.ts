import { FormControl } from '@angular/forms';

export interface StationForm {
  city: FormControl<string>;
  latitude: FormControl<number>;
  longitude: FormControl<number>;
  station: number;
}
