import React from "react"; 
import { IEventLocationProps, IEventLocationState } from "./IEventLocation";
import { ComboBox, IComboBoxOption, SelectableOptionMenuItemType } from '@fluentui/react';

export default class EventLocation extends React.PureComponent<IEventLocationProps, IEventLocationState> {
    
      private selectableOptions = this.props.eventLocations.filter(
        option =>
          (option.itemType === SelectableOptionMenuItemType.Normal || option.itemType === undefined) && !option.disabled,
      );
    
      public constructor(props) {
        super(props);
        this.state = {
          selectedKeys: this.props.selectedEventLocations.length == 0 ?
            [String('selectAll'), ...this.props.eventLocations.map(o => o.key as string)] :
            [String('selectAll'), ...this.props.selectedEventLocations.map(o => o.key as string)]
        };
      }
    
      private onChange = (event, option, index, value) => {
    
        const selected = option?.selected;
        const { selectedKeys } = this.state;
        const currentSelectedOptionKeys = selectedKeys.filter(key => key !== 'selectAll');
        const selectAllState = currentSelectedOptionKeys.length === this.selectableOptions.length;
    
        if (option) {
          if (option?.itemType === SelectableOptionMenuItemType.SelectAll) {
    
            selectAllState
              ? this.setState({ selectedKeys: [] }, () => { this.updateSelectableEventLocations(); })
              : this.setState({ selectedKeys: ['selectAll', ...this.selectableOptions.map(o => o.key as string)] }, () => { this.updateSelectableEventLocations(); });
          }
          else {
            const updatedKeys = selected
              ? [...currentSelectedOptionKeys, option!.key as string]
              : currentSelectedOptionKeys.filter(k => k !== option.key);
    
            if (updatedKeys.length === this.selectableOptions.length) {
              updatedKeys.push('selectAll');
            }
    
            this.setState({ selectedKeys: updatedKeys, }, () => { this.updateSelectableEventLocations(); });
          }
        }
      }
    
      private updateSelectableEventLocations() {
        const currentSelectedEventLocations: IComboBoxOption[] = [];
    
        if (this.state.selectedKeys.length >= 0) {
          this.state.selectedKeys.forEach(key => {
            const eventLocation: IComboBoxOption[] = this.selectableOptions.filter(opt => opt.key === key);
            if (eventLocation.length > 0) {
              currentSelectedEventLocations.push(eventLocation[0]);
            }
          });
        }
    
        this.props.onChangeEventLocations(currentSelectedEventLocations);
      }
    
      public render(): React.ReactElement {
        return (
          <div>
            <ComboBox
              label="Select Event Location"
              multiSelect
              options={[
                { key: 'selectAll', text: 'Select All', itemType: SelectableOptionMenuItemType.SelectAll },
                ...this.props.eventLocations
              ]}
              selectedKey={this.state.selectedKeys}
              onChange={this.onChange}
            />
          </div>
        );
      }
}