import React from 'react';
import moment from 'moment';
import momentJalaali from 'moment-jalaali';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import isSameDay from '../src/utils/isSameDay';

import {
  VERTICAL_ORIENTATION,
  ANCHOR_RIGHT,
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
  .add('default', withInfo()(() => (
    <DateRangePickerWrapper />
  )))
  .add('hidden with display: none', withInfo()(() => (
    <TestWrapper />
  )))
  .add('as part of a form', withInfo()(() => (
    <div>
      <DateRangePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  )))
  .add('non-english locale', withInfo()(() => {
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
  }))
  .add('non-english locale (Persian)', withInfo()(() => {
    moment.locale('fa');
    momentJalaali.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
    return (
      <DateRangePickerWrapper
        isRTL
        stateDateWrapper={momentJalaali}
        startDatePlaceholderText="تاریخ شروع"
        endDatePlaceholderText="تاریخ پایان"
        renderMonthText={month => momentJalaali(month).format('jMMMM jYYYY')}
        renderDayContents={day => momentJalaali(day).format('jD')}
      />
    )
  }))
  // Mirai: New example to set custom classes for days 
  .add('Assign important classes to calendar', withInfo()(() => {
    return (
      <DateRangePickerWrapper 
        hideKeyboardShortcutsPanel
        assignImportantCalendarClass={day1 => 
            datesList.some(day2 => isSameDay(day1, day2)) ? ["special_day1","special_day2"] : []
        }
      />
    );
  }))
  // Mirai: New example to set maximum nights 
  .add('Maximum nights selected', withInfo()(() => {
    return (
      <DateRangePickerWrapper
         hideKeyboardShortcutsPanel
         maximumNights={20}
      />
    );
  }))
  // Mirai: New example to set maximum nights 
  .add('Maximum date and minimum date', withInfo()(() => {
    return (
      <DateRangePickerWrapper
         hideKeyboardShortcutsPanel
         minDate={moment()}
         maxDate={moment().add(1, "year")}
      />
    );
  }))
  .add('with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <DateRangePickerWrapper
        startDatePlaceholderText="تاریخ شروع"
        endDatePlaceholderText="تاریخ پایان"
        anchorDirection={ANCHOR_RIGHT}
        showDefaultInputIcon
        showClearDates
        isRTL
      />
    </DirectionProvider>
  )))
  .add('vertical with custom height', withInfo()(() => (
    <DateRangePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  )));
