import React from 'react';
import moment from 'moment';
import momentJalaali from 'moment-jalaali';
import { storiesOf } from '@storybook/react';
import isSameDay from '../src/utils/isSameDay';

import {
  VERTICAL_ORIENTATION,
} from '../src/constants';

import DateRangePickerWrapper from '../examples/DateRangePickerWrapper';

const TestInput = props => (
  <div style={{ marginTop: 16 }}>
    <input
      {...props}
      type="text"
      style={{
        height: 48,
        width: 284,
        fontSize: 18,
        fontWeight: 200,
        padding: '12px 16px',
      }}
    />
  </div>
);

class TestWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
    };
  }

  render() {
    const { showDatePicker } = this.state;
    const display = showDatePicker ? 'block' : 'none';
    return (
      <div>
        <button
          type="button"
          onClick={() => this.setState({ showDatePicker: !showDatePicker })}
        >
          Show me!
        </button>

        <div style={{ display }}>
          <DateRangePickerWrapper />
        </div>
      </div>
    );
  }
}

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

storiesOf('DateRangePicker (DRP)', module)
  .addWithInfo('default', () => (
    <DateRangePickerWrapper />
  ))
  .addWithInfo('hidden with display: none', () => (
    <TestWrapper />
  ))
  .addWithInfo('as part of a form', () => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  ))
  .addWithInfo('non-english locale', () => {
    moment.locale('zh-cn');
    return (
      <DateRangePickerWrapper
        showClearDates
        startDatePlaceholderText="入住日期"
        endDatePlaceholderText="退房日期"
        monthFormat="YYYY[年]MMMM"
        phrases={{
          closeDatePicker: '关闭',
          clearDates: '清除日期',
        }}
      />
    );
  })
  .addWithInfo('non-english locale (Persian)', () => {
    moment.locale('fa');
    return (
      <DateRangePickerWrapper
        renderMonth={month => momentJalaali(month).format('jMMMM jYYYY')}
        renderDayContents={day => momentJalaali(day).format('jD')}
      />
    )
  })
  // Mirai: New example to set custom classes for days 
  .addWithInfo('Assign important classes to calendar', () => {
    return (
      <DateRangePickerWrapper 
        assignImportantCalendarClass={day1 => datesList.some(day2 => isSameDay(day1, day2)) ? ["clase1","clase2"] : []}
      />
    );
  })
  // Mirai: New example to set maximum nights 
  .addWithInfo('Maximum nights selected', () => {
    return (
      <DateRangePickerWrapper 
         maximumNights={20}
      />
    );
  })
  // Mirai: New example to set maximum nights 
  .addWithInfo('Maximum date and minimum date', () => {
    return (
      <DateRangePickerWrapper 
         minDate={moment()}
         maxDate={moment().add(1, "year")}
      />
    );
  })
  .addWithInfo('vertical with custom height', () => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  ));
