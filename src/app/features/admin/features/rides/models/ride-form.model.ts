import { FormArray, FormGroup } from '@angular/forms';
import { RideInfoForm } from './ride-info-form-model';

export interface RideFormModel {
  schedule: FormArray<FormGroup<RideInfoForm>>;
}
