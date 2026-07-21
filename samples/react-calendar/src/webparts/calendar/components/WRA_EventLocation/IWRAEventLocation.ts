import { IComboBoxOption } from '@fluentui/react';

export interface IWRAEventLocationProps {
  locations: IComboBoxOption[];
  selectedLocations: IComboBoxOption[];
  onChangeLocations: (selectedLocations: IComboBoxOption[]) => void;
}

export interface IWRAEventLocationState {
  selectedKeys: string[];
}
