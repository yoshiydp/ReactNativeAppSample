interface FormControlsType {
  label: string;
  placeholder: string;
  onChangeText?: (value: string) => void;
  value: string;
  secureText?: boolean;
  required?: boolean;
  notes?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  errorText?: string;
}

export type UserFormControlsType = FormControlsType;

export interface SettingsFormControlsType extends FormControlsType {
  onPressEditable?: () => void;
}

interface TextFieldType {
  label: string;
  placeholder: string;
  onChangeText?: (value: string) => void;
  value: string;
  secureText?: boolean;
  required?: boolean;
  notes?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  errorText?: string;
}

export type UserTextFieldType = TextFieldType;

export interface SettingsTextFieldType extends TextFieldType {
  onPressEditable?: () => void;
}
