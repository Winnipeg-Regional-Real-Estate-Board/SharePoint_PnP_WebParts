import * as React from 'react';
import { IComboBoxOption } from '@fluentui/react';
import { IEventData } from '../../../../services/IEventData';
import { Constants, DEFAULT_OTHER_LOCATION_COLOR, getFixedLocationColor, normalizeLocationKey } from '../../../../common/Constants';
import styles from './EventLocationLegend.module.scss';

export interface IEventLocationLegendProps {
  locations: IComboBoxOption[];
  events: IEventData[];
}

const EventLocationLegend = (props: IEventLocationLegendProps): JSX.Element => {
  const configuredLocations = props.locations.filter((location) =>
    location.key !== Constants.EventLocation.OthersOption.key
  );

  const configuredLocationSet = new Set(
    configuredLocations
      .map((location) => normalizeLocationKey(location.text))
      .filter((locationKey) => !!locationKey)
  );

  const hasOthers = (props.events || []).some((event) => {
    const normalizedLocation = normalizeLocationKey(event.WRA_EventLocation);
    return !!normalizedLocation && !configuredLocationSet.has(normalizedLocation);
  });

  const legendItems: { key: string; label: string; color: string }[] = configuredLocations.map((location, index) => ({
    key: location.key.toString(),
    label: location.text,
    color: getFixedLocationColor(location.text, index)
  }));

  if (hasOthers) {
    legendItems.push({
      key: Constants.EventLocation.OthersOption.key,
      label: Constants.EventLocation.OthersOption.text,
      color: DEFAULT_OTHER_LOCATION_COLOR
    });
  }

  if (legendItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.legendContainer}>
      {legendItems.map((item) => (
        <span className={styles.legendItem} key={item.key}>
          <span className={styles.legendSwatch} style={{ backgroundColor: item.color }} />
          <span className={styles.legendLabel}>{item.label}</span>
        </span>
      ))}
    </div>
  );
};

export default EventLocationLegend;
