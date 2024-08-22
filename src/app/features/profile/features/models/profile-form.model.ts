import { FormControl } from '@angular/forms';

export interface ProfileForm {
  editableName: FormControl<string | null>;
  editableEmail: FormControl<string | null>;
}
