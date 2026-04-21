import { IComboBoxOption } from '@fluentui/react';
export interface ICategoryProps {
    categories: IComboBoxOption[];
    selectedCategories: IComboBoxOption[];
    onChangeCategories: (onChangeCategories: IComboBoxOption[]) => void;
 
}
export interface ICategoryState {
    selectedKeys: string[];
}