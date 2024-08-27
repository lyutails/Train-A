import { FormControl } from '@angular/forms';

export interface SearchForm {
  from: FormControl<string>;
  to: FormControl<string>;
  date: FormControl<string>;
}
