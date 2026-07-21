import React from 'react';
import { ComboBox, IComboBox, IComboBoxOption, SelectableOptionMenuItemType } from '@fluentui/react';
import { IWRAEventLocationProps, IWRAEventLocationState } from './IWRAEventLocation';

export default class WRAEventLocation extends React.PureComponent<IWRAEventLocationProps, IWRAEventLocationState> {
  private selectableOptions = this.props.locations.filter(
    option =>
      (option.itemType === SelectableOptionMenuItemType.Normal || option.itemType === undefined) && !option.disabled,
  );

  public constructor(props: IWRAEventLocationProps) {
    super(props);
    this.state = {
      selectedKeys: this.props.selectedLocations.length === 0
        ? [String('selectAll'), ...this.props.locations.map(o => o.key as string)]
        : [String('selectAll'), ...this.props.selectedLocations.map(o => o.key as string)]
    };
  }

  private onChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
    const selected = option?.selected;
    const { selectedKeys } = this.state;
    const currentSelectedOptionKeys = selectedKeys.filter(key => key !== 'selectAll');
    const selectAllState = currentSelectedOptionKeys.length === this.selectableOptions.length;

    if (!option) {
      return;
    }

    if (option.itemType === SelectableOptionMenuItemType.SelectAll) {
      selectAllState
        ? this.setState({ selectedKeys: [] }, () => this.updateSelectableLocations())
        : this.setState(
          { selectedKeys: ['selectAll', ...this.selectableOptions.map(o => o.key as string)] },
          () => this.updateSelectableLocations(),
        );
      return;
    }

    const updatedKeys = selected
      ? [...currentSelectedOptionKeys, option.key as string]
      : currentSelectedOptionKeys.filter(k => k !== option.key);

    if (updatedKeys.length === this.selectableOptions.length) {
      updatedKeys.push('selectAll');
    }

    this.setState({ selectedKeys: updatedKeys }, () => this.updateSelectableLocations());
  }

  private updateSelectableLocations(): void {
    const currentSelectedLocations: IComboBoxOption[] = [];

    this.state.selectedKeys.forEach(key => {
      const location = this.selectableOptions.find(opt => opt.key === key);
      if (location) {
        currentSelectedLocations.push(location);
      }
    });

    this.props.onChangeLocations(currentSelectedLocations);
  }

  public render(): React.ReactElement {
    return (
      <div>
        <ComboBox
          label="Select Event Location"
          multiSelect
          options={[
            ...this.props.locations,
          ]}
          selectedKey={this.state.selectedKeys}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
