import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';

import isSameDay from '../src/utils/isSameDay';
import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const datesList = [
  moment(),
  moment().add(1, 'days'),
  moment().add(3, 'days'),
  moment().add(9, 'days'),
  moment().add(10, 'days'),
  moment().add(11, 'days'),
  moment().add(12, 'days'),
  moment().add(13, 'days'),
];

const minDate = moment().startOf('day');
const maxDate = moment().startOf('day').add(12, 'months');


storiesOf('DRP - Day Props', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper autoFocus />
  ))
  .addWithInfo('with minimum nights set', () => (
    <DateRangePickerWrapper
      minimumNights={3}
      initialStartDate={moment().add(3, 'days')}
      autoFocusEndDate
    />
  ))
  .addWithInfo('allows single day range', () => (
    <DateRangePickerWrapper
      minimumNights={0}
      initialStartDate={moment().add(3, 'days')}
      autoFocusEndDate
    />
  ))
  .addWithInfo('allows all days, including past days', () => (
    <DateRangePickerWrapper
      isOutsideRange={() => false}
      autoFocus
    />
  ))
  .addWithInfo('allows next two weeks only', () => (
    <DateRangePickerWrapper
      isOutsideRange={day =>
        !isInclusivelyAfterDay(day, moment()) ||
        isInclusivelyAfterDay(day, moment().add(2, 'weeks'))
      }
      autoFocus
    />
  ))
  .addWithInfo('with some blocked dates', () => (
    <DateRangePickerWrapper
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  ))
  .addWithInfo('with maximum date and minimum date', () => (
    <DateRangePickerWrapper
      isDayBlocked={currentDay => currentDay.clone().startOf('day').diff(minDate) < 0 || currentDay.clone().startOf('day').diff(maxDate) > 0}
      autoFocus
    />
  ))
  .addWithInfo('with some highlighted dates', () => (
    <DateRangePickerWrapper
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
      autoFocus
    />
  ))
  .addWithInfo('blocks fridays', () => (
    <DateRangePickerWrapper
      isDayBlocked={day => moment.weekdays(day.weekday()) === 'Friday'}
      autoFocus
    />
  ))
  .addWithInfo('with custom daily details', () => (
    <DateRangePickerWrapper
      renderDay={day => day.format('ddd')}
      autoFocus
    />
  ));
