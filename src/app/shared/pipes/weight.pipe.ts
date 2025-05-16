import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
  standalone: true
})
export class WeightPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    return `${value} kg`;
  }
}
