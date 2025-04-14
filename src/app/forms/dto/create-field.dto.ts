export class CreateFieldDto {
  label: string;
  type: string;
  value?: string;
  values?: string[];
  required?: boolean;
  placeholder?: string;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
  order?: number;
}
