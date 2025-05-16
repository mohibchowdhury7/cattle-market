import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availabilityStatus',
  standalone: true
})
export class AvailabilityStatusPipe implements PipeTransform {
  transform(available: boolean): string {
    return available ? 'Available' : 'Sold';
  }
}
