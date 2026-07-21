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
  }
};

export const DEFAULT_OTHER_LOCATION_COLOR = "#000000";

const EVENT_LOCATION_COLOR_PALETTE: string[] = [
  "#004f5e",
  "#1F4E79",
  "#8A3B12",
  "#6A1B9A",
  "#AD1457",
  "#289683",
  "#006064",
  "#5D4037",
  "#283593",
  "#455A64",
  "#B71C1C",
  "#2f94bd"
];

export const normalizeLocationKey = (value: string): string => {
  return value ? value.trim().toLowerCase() : "";
};

export const getFixedLocationColor = (locationName: string): string => {
  const normalized = normalizeLocationKey(locationName);
  if (!normalized) {
    return DEFAULT_OTHER_LOCATION_COLOR;
  }

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = ((hash << 5) - hash) + normalized.charCodeAt(i);
    hash |= 0;
  }

  return EVENT_LOCATION_COLOR_PALETTE[Math.abs(hash) % EVENT_LOCATION_COLOR_PALETTE.length];
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