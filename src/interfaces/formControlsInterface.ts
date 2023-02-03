export interface FormControlsType {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
  secureText?: boolean;
  required?: boolean;
  notes?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  errorText?: string;
}

export interface TextFieldType {
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
  secureText?: boolean;
  required?: boolean;
  notes?: string;
  editable?: boolean;
  selectTextOnFocus?: boolean;
}
