import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface RideSegmentsForm {
  price: FormGroup<Record<string, FormControl<number>>>;
  time: FormArray<FormControl<string>>;
}
