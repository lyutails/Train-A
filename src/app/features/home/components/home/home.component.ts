import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../../common/button/button.component';
import { SearchForm } from '../../models/search-form.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TrimPipe } from '../../../../common/pipes/trim-pipe/trim.pipe';

@Component({
  selector: 'TTP-home',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatSuffix,
    MatDatepicker,
    MatHint,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    UpperCasePipe,
    MatButton,
    ReactiveFormsModule,
    ButtonComponent,
    MatAutocompleteModule,
    TrimPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public searchForm!: FormGroup<SearchForm>;
  private datePattern =
    /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  testCities: string[] = ['london', 'Paris', 'Amsterdam', 'Kirovsk', 'SPb'];
  cityControl = new FormControl('');

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.searchForm = this.searchFormInstance;
  }

  private get searchFormInstance(): FormGroup<SearchForm> {
    return this.fb.group<SearchForm>({
      from: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required],
        },
      ),
      to: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required],
        },
      ),
      date: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required],
        },
      ),
    });
  }

  public get searchFromFormControl(): FormControl<string> {
    return this.searchForm.controls.from;
  }

  public get searchToFormControl(): FormControl<string> {
    return this.searchForm.controls.to;
  }

  public get searchDateFormControl(): FormControl<string> {
    return this.searchForm.controls.date;
  }

  public getCarriages() {
    // api call here
  }

  public searchTrips() {
    // api call here
  }

  onSubmit() {
    this.searchForm.reset();
  }
}
