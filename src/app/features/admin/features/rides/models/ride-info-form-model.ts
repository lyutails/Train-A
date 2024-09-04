import { FormArray, FormGroup } from '@angular/forms';
import { RideSegmentsForm } from './ride-segments-form.model';

export interface RideInfoForm {
  segments: FormArray<FormGroup<RideSegmentsForm>>;
}
