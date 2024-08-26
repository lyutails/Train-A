import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftSeatsTrim',
  standalone: true,
})
export class LeftSeatsTrimPipe implements PipeTransform {
  transform(value: string) {
    return +value.slice(10);
  }
}
