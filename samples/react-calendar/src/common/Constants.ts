import * as strings from "CalendarWebPartStrings";
import { IDatePickerStrings } from "office-ui-fabric-react";

export const Constants = {
  CategoryColumn: "Category",
  MetaDataFieldType: "SP.Taxonomy.TaxonomyFieldValue",
  EventResult_LocalStorage: "eventResult",
  CalendarEventsWithLocalTime_LocalStorage: "calendarEventsWithLocalTime",
  AndConditionStart: "<And>",
  AndConditionEnd: "</And>",
  OrConditionStart: "<Or>",
  OrConditionEnd: "</Or>",
  latitude: 49.88302544223227,
  longitude: -97.18531498719334,
  eventLayoutOverviewPageURL: `{0}/_layouts/15/Event.aspx?ListGuid={1}&ItemId={2}`,
  EventLocation: {
    InternalName:"WRA_EventLocation",
    DisplayName: "Event Location",
    Type: "Choice",
    OthersOption: {
      key: "__OTHER_LOCATION__",
      text: "Others"
    }
  },
  DeletedField: {
    InternalName: "Deleted",
    DisplayName: "Deleted",
    Type: "Boolean"
  },
  CommitteeField: {
    InternalName: "CommitteeName",
    DisplayName: "Committee",
    Type: "Choice"
  }
};

export const DEFAULT_OTHER_LOCATION_COLOR = "#000000";

const EVENT_LOCATION_COLOR_PALETTE: string[] = [
  "#4eb860",
  "#d397d8",
  "#fcd389",
  "#AD1457",
  "#2f94bd",
  "#289683",
  "#43f8e0",
  "#83e293",
  "#283593",
  "#455A64",
  "#B71C1C",
  "#802c45"
];

export const normalizeLocationKey = (value: string): string => {
  return value ? value.trim().toLowerCase() : "";
};

const mixHexColors = (firstHex: string, secondHex: string): string => {
  const parseChannel = (value: string, start: number): number => parseInt(value.substr(start, 2), 16);
  const red = Math.round((parseChannel(firstHex, 1) + parseChannel(secondHex, 1)) / 2);
  const green = Math.round((parseChannel(firstHex, 3) + parseChannel(secondHex, 3)) / 2);
  const blue = Math.round((parseChannel(firstHex, 5) + parseChannel(secondHex, 5)) / 2);

  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
};

export const getFixedLocationColor = (_locationName: string, locationIndex: number): string => {
  if (locationIndex === undefined || locationIndex === null || locationIndex < 0) {
    return DEFAULT_OTHER_LOCATION_COLOR;
  }

  const paletteSize = EVENT_LOCATION_COLOR_PALETTE.length;
  if (locationIndex < paletteSize) {
    return EVENT_LOCATION_COLOR_PALETTE[locationIndex];
  }

  const mixedIndex = locationIndex - paletteSize;
  const firstColorIndex = mixedIndex % paletteSize;
  const secondColorIndex = Math.floor(mixedIndex / paletteSize) % paletteSize;

  return mixHexColors(
    EVENT_LOCATION_COLOR_PALETTE[firstColorIndex],
    EVENT_LOCATION_COLOR_PALETTE[secondColorIndex]
  );
};

export const DayPickerStrings: IDatePickerStrings = {
  months: [
    strings.January,
    strings.February,
    strings.March,
    strings.April,
    strings.May,
    strings.June,
    strings.July,
    strings.August,
    strings.September,
    strings.October,
    strings.November,
    strings.December,
  ],
  shortMonths: [
    strings.Jan,
    strings.Feb,
    strings.Mar,
    strings.Apr,
    strings.May,
    strings.Jun,
    strings.Jul,
    strings.Aug,
    strings.Sep,
    strings.Oct,
    strings.Nov,
    strings.Dez,
  ],
  days: [
    strings.Sunday,
    strings.Monday,
    strings.Tuesday,
    strings.Wednesday,
    strings.Thursday,
    strings.Friday,
    strings.Saturday,
  ],
  shortDays: [
    strings.ShortDay_S,
    strings.ShortDay_M,
    strings.ShortDay_T,
    strings.ShortDay_W,
    strings.ShortDay_Thursday,
    strings.ShortDay_Friday,
    strings.ShortDay_Sunday,
  ],
  goToToday: strings.GoToDay,
  prevMonthAriaLabel: strings.PrevMonth,
  nextMonthAriaLabel: strings.NextMonth,
  prevYearAriaLabel: strings.PrevYear,
  nextYearAriaLabel: strings.NextYear,
  closeButtonAriaLabel: strings.CloseDate,
  isRequiredErrorMessage: strings.IsRequired,
  invalidInputErrorMessage: strings.InvalidDateFormat,
};