import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rigthSeatsTrim',
  standalone: true,
})
export class RigthSeatsTrimPipe implements PipeTransform {
  transform(value: string) {
    return +value.slice(11);
  }
}
