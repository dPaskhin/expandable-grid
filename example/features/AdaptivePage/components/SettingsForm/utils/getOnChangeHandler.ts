import { Dispatch, SetStateAction } from 'react';

import { InputTypes } from '@features/AdaptivePage/components/SettingsForm/enums/InputTypes';
import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

interface IParams {
  value: string;
  inputType: InputTypes;
}

export const getOnChangeHandler = (setValue: Dispatch<SetStateAction<IMediaValue<number | null>>>) => (
  ({ value, inputType }: IParams) => {
    const formattedValue = parseInt(value);

    if (isNaN(formattedValue)) {
      return;
    }

    switch (inputType) {
    case InputTypes.VALUE:
      setValue(prevState => ({
        ...prevState,
        value: formattedValue,
      }));

      return;
    case InputTypes.MIN:
      setValue(prevState => ({
        ...prevState,
        windowWidth: {
          ...prevState.windowWidth,
          min: formattedValue,
        },
      }));

      return;
    case InputTypes.MAX:
      setValue(prevState => ({
        ...prevState,
        windowWidth: {
          ...prevState.windowWidth,
          max: formattedValue,
        },
      }));

      return;
    }
  }
);
