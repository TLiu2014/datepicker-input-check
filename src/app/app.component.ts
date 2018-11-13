import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AppComponent {
  title = 'datepicker-input-check';
  date = new FormControl(
    'date', [
      Validators.required
    ]
  );
  // minDate is the start of today.
  minDate = new Date(new Date().setHours(0, 0, 0, 0));

  getErrorMessage(pickerInput: string): string {
    if (!pickerInput || pickerInput === '' ) {
      return 'Please choose a date.';
    }
    return this.isMyDateFormat(pickerInput);
  }
  /**
   * An example of custom validator on a date string.
   * Valid date is a string, which is:
   * 1, in the form of YYYY-MM-DD
   * 2, later than today
   * 3, not an invalid value like 2018-20-81
   * @param date a date string
   */
  isMyDateFormat(date: string): string {
    if (date.length !== 10) {
      return 'Invalid input: Please input a string in the form of YYYY-MM-DD';
    } else {
      const da = date.split('-');
      if (da.length !== 3 || da[0].length !== 4 || da[1].length !== 2 || da[2].length !== 2) {
        return 'Invalid input: Please input a string in the form of YYYY-MM-DD';
      } else if (moment(date).isValid()) {
        return 'Invalid date: Please input a date no later than today';
      } else if (!moment(date).isValid()) {
        return 'Invalid date: Please input a date with a valid month and date.';
      }
    }
    return 'Unknown error.';
  }
}
