export type Option = {
    value: string;
    label: string;
  };
  
  export type Field = {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    columns: number;
    options?: Option[];
    multiline?: boolean;
    disabled?: boolean;
    isMultipleSelect?: boolean;
  };