import { FormArray, FormGroup } from '@angular/forms';
import { RideSegmentsForm } from '../models/ride-segments-form.model';

export const validateTimeSequence = (segments: FormArray<FormGroup<RideSegmentsForm>>): boolean => {
  for (let i = 0; i < segments.length - 1; i++) {
    const currentSegment = segments.at(i);
    const departs = new Date(currentSegment.controls.time.at(0).value);
    const arrives = new Date(currentSegment.controls.time.at(1).value);

    if (departs >= arrives) {
      return false;
    }
  }

  return true;
};
