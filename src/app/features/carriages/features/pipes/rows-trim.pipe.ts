import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rowsTrim',
  standalone: true,
})
export class RowsTrimPipe implements PipeTransform {
  transform(value: string) {
    return +value.slice(4);
  }
}
