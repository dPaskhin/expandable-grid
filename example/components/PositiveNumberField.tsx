import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface IProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
}

export const PositiveNumberField: FC<IProps> = ({ value, onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = Number.parseInt(event.currentTarget.value, 10);

    if (Number.isNaN(parsed) || parsed <= 0) {
      parsed = 1;
    }

    onChange(parsed);
  };

  return (
    <TextField
      {...props}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      value={value}
      onChange={handleChange}
    />
  );
};
