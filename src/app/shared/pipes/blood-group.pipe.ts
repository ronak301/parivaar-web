import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bloodGroup'
})
export class BloodGroupPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'A_POSITIVE':
                return 'A+';
            case 'A_NEGETIVE':
                return 'A-';
            case 'B_POSITIVE':
                return 'B+';
            case 'B_NEGETIVE':
                return 'B-';
            case 'O_POSITIVE':
                return 'O+';
            case 'O_NEGETIVE':
                return 'O-';
            case 'AB_POSITIVE':
                return 'AB+';
            case 'AB_NEGETIVE':
                return 'AB-';
            default:
                return value;
        }
    }
}