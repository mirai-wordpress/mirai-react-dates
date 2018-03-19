import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger, or } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import getCalendarDaySettings from '../utils/getCalendarDaySettings';

import { DAY_SIZE } from '../constants';
import DefaultTheme from '../theme/DefaultTheme';

const { reactDates: { color } } = DefaultTheme;

function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;

  const { hover } = stylesObj;
  if (isHovered && hover) {
    return hover;
  }

  return stylesObj;
}

const DayStyleShape = PropTypes.shape({
  background: PropTypes.string,
  border: or([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,

  hover: PropTypes.shape({
    background: PropTypes.string,
    border: or([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }),
});

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,

  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  firstDayOfWeekStyles: DayStyleShape,
  lastDayOfWeekStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,
  importantDayStyles: DayStyleShape,
  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // style defaults
  defaultStyles: {
    border: `1px solid ${color.core.borderLight}`,
    color: color.text,
    background: color.background,

    hover: {
      background: color.core.borderLight,
      border: `1px double ${color.core.borderLight}`,
      color: 'inherit',
    },
  },
  outsideStyles: {
    background: color.outside.backgroundColor,
    border: 0,
    color: color.outside.color,
  },
  todayStyles: {},
  highlightedCalendarStyles: {
    background: color.highlighted.backgroundColor,
    color: color.highlighted.color,

    hover: {
      background: color.highlighted.backgroundColor_hover,
      color: color.highlighted.color_active,
    },
  },
  blockedMinNightsStyles: {
    background: color.minimumNights.backgroundColor,
    border: `1px solid ${color.minimumNights.borderColor}`,
    color: color.minimumNights.color,

    hover: {
      background: color.minimumNights.backgroundColor_hover,
      color: color.minimumNights.color_active,
    },
  },
  blockedCalendarStyles: {
    background: color.blocked_calendar.backgroundColor,
    border: `1px solid ${color.blocked_calendar.borderColor}`,
    color: color.blocked_calendar.color,

    hover: {
      background: color.blocked_calendar.backgroundColor_hover,
      border: `1px solid ${color.blocked_calendar.borderColor}`,
      color: color.blocked_calendar.color_active,
    },
  },
  blockedOutOfRangeStyles: {
    background: color.blocked_out_of_range.backgroundColor,
    border: `1px solid ${color.blocked_out_of_range.borderColor}`,
    color: color.blocked_out_of_range.color,

    hover: {
      background: color.blocked_out_of_range.backgroundColor_hover,
      border: `1px solid ${color.blocked_out_of_range.borderColor}`,
      color: color.blocked_out_of_range.color_active,
    },
  },
  hoveredSpanStyles: {
    background: color.hoveredSpan.backgroundColor,
    border: `1px solid ${color.hoveredSpan.borderColor}`,
    color: color.hoveredSpan.color,

    hover: {
      background: color.hoveredSpan.backgroundColor_hover,
      border: `1px solid ${color.hoveredSpan.borderColor}`,
      color: color.hoveredSpan.color_active,
    },
  },
  selectedSpanStyles: {
    background: color.selectedSpan.backgroundColor,
    border: `1px solid ${color.selectedSpan.borderColor}`,
    color: color.selectedSpan.color,

    hover: {
      background: color.selectedSpan.backgroundColor_hover,
      border: `1px solid ${color.selectedSpan.borderColor}`,
      color: color.selectedSpan.color_active,
    },
  },
  lastInRangeStyles: {
    borderRight: color.core.primary,
  },
  selectedStyles: {
    background: color.selected.backgroundColor,
    border: `1px solid ${color.selected.borderColor}`,
    color: color.selected.color,

    hover: {
      background: color.selected.backgroundColor_hover,
      border: `1px solid ${color.selected.borderColor}`,
      color: color.selected.color_active,
    },
  },
  specialDay1Styles: {
    background: color.special_day1.backgroundColor,
    border: `1px solid ${color.special_day1.borderColor}`,
    color: color.special_day1.color,

    hover: {
      background: color.special_day1.backgroundColor_hover,
      border: `1px solid ${color.special_day1.borderColor}`,
      color: color.special_day1.color_active,
    },

    active: {
      background: color.special_day1.backgroundColor_active,
      border: `1px solid ${color.special_day1.borderColor}`,
      color: color.special_day1.color_active,
    }
  },
  specialDay2Styles: {
    background: color.special_day2.backgroundColor,
    border: `1px solid ${color.special_day2.borderColor}`,
    color: color.special_day2.color,

    hover: {
      background: color.special_day2.backgroundColor_hover,
      border: `1px solid ${color.special_day2.borderColor}`,
      color: color.special_day2.color_active,
    },

    active: {
      background: color.special_day2.backgroundColor_active,
      border: `1px solid ${color.special_day2.borderColor}`,
      color: color.special_day2.color_active,
    }
  },
  selectedStartStyles: {},
  selectedEndStyles: {},
  afterHoveredStartStyles: {},
  firstDayOfWeekStyles: {},
  lastDayOfWeekStyles: {},
  importantDayStyles: {},

  // internationalization
  phrases: CalendarDayPhrases,
};

class CustomizableCalendarDay extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isHovered: false,
    };

    this.setButtonRef = this.setButtonRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    this.setState({ isHovered: true });
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    this.setState({ isHovered: false });
    onDayMouseLeave(day, e);
  }

  onKeyDown(day, e) {
    const {
      onDayClick,
    } = this.props;

    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  }

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day,
      ariaLabelFormat,
      daySize,
      isOutsideDay,
      modifiers,
      tabIndex,
      renderDayContents,
      styles,
      phrases,

      defaultStyles: defaultStylesWithHover,
      outsideStyles: outsideStylesWithHover,
      todayStyles: todayStylesWithHover,
      firstDayOfWeekStyles: firstDayOfWeekStylesWithHover,
      lastDayOfWeekStyles: lastDayOfWeekStylesWithHover,
      highlightedCalendarStyles: highlightedCalendarStylesWithHover,
      blockedMinNightsStyles: blockedMinNightsStylesWithHover,
      blockedMaxNightsStyles: blockedMaxNightsStylesWithHover,
      blockedCalendarStyles: blockedCalendarStylesWithHover,
      blockedOutOfRangeStyles: blockedOutOfRangeStylesWithHover,
      hoveredSpanStyles: hoveredSpanStylesWithHover,
      selectedSpanStyles: selectedSpanStylesWithHover,
      lastInRangeStyles: lastInRangeStylesWithHover,
      selectedStyles: selectedStylesWithHover,
      selectedStartStyles: selectedStartStylesWithHover,
      selectedEndStyles: selectedEndStylesWithHover,
      afterHoveredStartStyles: afterHoveredStartStylesWithHover,
      importantDayStyles: importantDayStylesWithHover
    } = this.props;

    const { isHovered } = this.state;

    if (!day) return <td />;

    const {
      daySizeStyles,
      useDefaultCursor,
      selected,
      hoveredSpan,
      isOutsideRange,
      ariaLabel,
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    var filterImportantDayStyles = Array.from(modifiers).filter(modifier => {
        return modifier.startsWith("important-calendar-");
    }).map(importantDay => {
        return importantDay.substring("important-calendar-".length);
    });

    const defaultStyles = getStyles(defaultStylesWithHover, isHovered);
    const outsideStyles = getStyles(outsideStylesWithHover, isHovered);
    const todayStyles = getStyles(todayStylesWithHover, isHovered);
    const firstDayOfWeekStyles = getStyles(firstDayOfWeekStylesWithHover, isHovered);
    const lastDayOfWeekStyles = getStyles(lastDayOfWeekStylesWithHover, isHovered);
    const highlightedCalendarStyles = getStyles(highlightedCalendarStylesWithHover, isHovered);
    const blockedMinNightsStyles = getStyles(blockedMinNightsStylesWithHover, isHovered);
    const blockedMaxNightsStyles = getStyles(blockedMaxNightsStylesWithHover, isHovered);
    const blockedCalendarStyles = getStyles(blockedCalendarStylesWithHover, isHovered);
    const blockedOutOfRangeStyles = getStyles(blockedOutOfRangeStylesWithHover, isHovered);
    const hoveredSpanStyles = getStyles(hoveredSpanStylesWithHover, isHovered);
    const selectedSpanStyles = getStyles(selectedSpanStylesWithHover, isHovered);
    const lastInRangeStyles = getStyles(lastInRangeStylesWithHover, isHovered);
    const selectedStartStyles = getStyles(selectedStartStylesWithHover, isHovered);
    const selectedEndStyles = getStyles(selectedEndStylesWithHover, isHovered);
    const selectedStyles = getStyles(selectedStylesWithHover, isHovered);
    const afterHoveredStartStyles = getStyles(afterHoveredStartStylesWithHover, isHovered);
    
    const importantDayStylesWithHoverFiltered = filterImportantDayStyles.filter(importantDay => {
        return importantDayStylesWithHover[importantDay] !== undefined;
    });
    
    const importantDayStylesCustom = Object.keys(importantDayStylesWithHover).filter(importantDayStyle => {
        return importantDayStylesWithHoverFiltered.includes(importantDayStyle);
    }).map(importantDayStyle => getStyles(importantDayStylesWithHover[importantDayStyle], isHovered));
    
    var hasImportantDayStyles = false;
    var importantDayStyles = filterImportantDayStyles.map(importantDay => {
      if (styles["CalendarDay__" + importantDay] !== undefined) {
        hasImportantDayStyles = true;
        return styles["CalendarDay__" + importantDay];
      }
    });
    const hasCustomImportantDays = importantDayStylesWithHoverFiltered.length > 0 && importantDayStylesCustom.length > 0;
    const hasCustomSelectedStyles =
      defaultStyles ||
      (selected && selectedStyles) ||
      (modifiers.has('selected-start') && selectedStartStyles) ||
      (modifiers.has('selected-end') && selectedEndStyles);
    const hasCustomHoveredStyles =
      (modifiers.has('hovered-span') && hoveredSpanStyles) ||
      (modifiers.has('after-hovered-start') && afterHoveredStartStyles);
    const hasCustomStyles =
      (isOutsideDay && outsideStyles) ||
      (modifiers.has('today') && todayStyles) ||
      (modifiers.has('highlighted-calendar') && highlightedCalendarStyles) ||
      (modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles) ||
      (modifiers.has('blocked-maximum-nights') && blockedMaxNightsStyles) ||
      (modifiers.has('blocked-calendar') && blockedCalendarStyles) ||
      (modifiers.has('last-in-range') && lastInRangeStyles) ||
      (modifiers.has('selected-span') && selectedSpanStyles) ||
      (isOutsideRange && blockedOutOfRangeStyles) ||
      hasCustomSelectedStyles ||
      hasCustomHoveredStyles || 
      hasCustomImportantDays;

    return (
      <td
        {...css(
          styles.CalendarDay,
          useDefaultCursor && styles.CalendarDay__defaultCursor,
          daySizeStyles,
          defaultStyles,
          isOutsideDay && outsideStyles,
          modifiers.has('today') && todayStyles,
          modifiers.has('first-day-of-week') && firstDayOfWeekStyles,
          modifiers.has('last-day-of-week') && lastDayOfWeekStyles,
          modifiers.has('highlighted-calendar') && highlightedCalendarStyles,
          hasCustomImportantDays && importantDayStylesCustom,
          modifiers.has('blocked-minimum-nights') && blockedMinNightsStyles,
          modifiers.has('blocked-maximum-nights') && blockedMaxNightsStyles,
          modifiers.has('blocked-calendar') && blockedCalendarStyles,
          hoveredSpan && hoveredSpanStyles,
          modifiers.has('after-hovered-start') && afterHoveredStartStyles,
          modifiers.has('selected-span') && selectedSpanStyles,
          modifiers.has('last-in-range') && lastInRangeStyles,
          selected && selectedStyles,
          modifiers.has('selected-start') && selectedStartStyles,
          modifiers.has('selected-end') && selectedEndStyles,
          isOutsideRange && blockedOutOfRangeStyles,
        )}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        ref={this.setButtonRef}
        aria-label={ariaLabel}
        onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
        onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
        onMouseUp={(e) => { e.currentTarget.blur(); }}
        onClick={(e) => { this.onDayClick(day, e); }}
        onKeyDown={(e) => { this.onKeyDown(day, e); }}
        tabIndex={tabIndex}
      >
        {renderDayContents ? renderDayContents(day, modifiers) : day.format('D')}
      </td>
    );
  }
}

CustomizableCalendarDay.propTypes = propTypes;
CustomizableCalendarDay.defaultProps = defaultProps;

export { CustomizableCalendarDay as PureCustomizableCalendarDay };
export default withStyles(({ reactDates: { font } }) => ({
  CalendarDay: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: font.size,
    textAlign: 'center',

    ':active': {
      outline: 0,
    },
  },

  CalendarDay__defaultCursor: {
    cursor: 'default',
  },
}))(CustomizableCalendarDay);
