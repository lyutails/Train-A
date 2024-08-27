import { FormArray, FormControl } from '@angular/forms';

export interface RideForm {
  time: FormArray<FormControl<string>>;
  // price: FormGroup<Record<string, FormControl<number>>>;
}
