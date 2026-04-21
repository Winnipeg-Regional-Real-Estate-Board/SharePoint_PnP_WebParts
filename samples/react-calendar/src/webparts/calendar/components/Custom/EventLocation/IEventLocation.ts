import { IComboBoxOption } from '@fluentui/react';
export interface IEventLocationProps {
    eventLocations: IComboBoxOption[];
    selectedEventLocations: IComboBoxOption[];
    onChangeEventLocations: (onChangeEventLocations: IComboBoxOption[]) => void;
 
}
export interface IEventLocationState {
    selectedKeys: string[];
}