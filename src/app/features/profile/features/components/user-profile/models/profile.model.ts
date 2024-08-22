import { FormControl } from '@angular/forms';

export interface ProfileForm {
  name: FormControl<string>;
  email: FormControl<string>;
}
