import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tostring',
  standalone: true,
})
export class TostringPipe implements PipeTransform {
  transform(value: number) {
    return value.toString();
  }
}
