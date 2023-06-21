import { Component, Input, OnInit } from '@angular/core';

import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent {

  constructor() {
  }

  errorMsgList: any = [];

  @Input()
  control!: AbstractControl | null;

    errorMessage: any = {
        required  : (params: any)  => `This field is required`,
        maxlength : (params: any)  => `Maximum ${params.requiredLength} characters are allowed`,
        minlength : (params: any)  => `Minimum ${params.requiredLength} characters are required`,
        pattern   : (params: any)  => `Please check the format, its invalid`,
        min       : (params: any)  => `Minimum value should be ${params.min}`,
        max       : (params: any)  => `Maximum value should be ${params.max}`,
        whitespace: (params: any)   => `White spaces are not allowed`,
        dateMaximum: (params: any)   => `Maximum date should be less than or equal to ${params.dateMaximum}`,
        dateMinimum: (params: any)   => `Minimum date should be greater than or equal to ${params.dateMinimum}`,
        dateTimeMaximum: (params: any)   => `Maximum date time should be less than or equal to ${params.dateTimeMaximum}`,
        dateTimeMinimum: (params: any)   => `Minimum date time should be greater than or equal to ${params.dateTimeMinimum}`,
        timeMaximum: (params: any)   => `Maximum time should be less than or equal to ${params.timeMaximum}`,
        timeMinimum: (params: any)   => `Minimum time should be greater than or equal to ${params.timeMinimum}`,
        minArraylength: (params: any)   => `No. of items should be greater than ${params.minArraylength}`,
        maxArraylength: (params: any)   => `No. of items should be less than ${params.maxArraylength}`,
        validHexColor: (params: any)   => `Enter a valid Hex Color Code Eg: ${params.validHexColor}`,
        arrayContains: (params: any)   => `Make sure you are selecting from these ${params.arrayContains}`,
        unSupportedFormat: (params: any)   => `Make sure you are uploading any of these suppoted formats ${params.unSupportedFormat}`,
        maxFileSize: (params: any)   => `Maximum supported file size is ${params.maxFileSize}`,
        unSupportedDimensions: (params: any)   => `Make sure you are uploading image with these ${params.unSupportedDimensions} dimensions.`,
        validEmail: (params: any)   => `Enter a valid email like: ${params.validEmail}`,
        validStrongPassword: (params: any)   => `${params.validStrongPassword}`,
        validPhone: (params: any)   => `${params.validPhone}`,
        validUrl: (params: any)   => `${params.validUrl}`,
        matDatepickerParse: (params: any)   => `Some Error`
    };

    listErrors(): Array<any> {
        if (!this.control) { return []; }
        if (this.control.errors) {
            this.errorMsgList = [];
            Object.keys(this.control.errors).map(error => {
              const errorMsg = this.control?.errors as any;
              if(errorMsg[error]){
                const finalError = errorMsg[error];
              if (this.control?.touched || this.control?.dirty){
                // console.log(this.errorMessage[error]())
                this.errorMsgList.push(this.errorMessage[error]());
              }
              }

            });
            return this.errorMsgList;
        }
        else {
            return [];
        }
    }

}
