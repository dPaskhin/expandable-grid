import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';

import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';
import { defaultMediaValue } from '@features/AdaptivePage/components/SettingsForm/utils/defaultMediaValue';
import { getOnChangeHandler } from '@features/AdaptivePage/components/SettingsForm/utils/getOnChangeHandler';
import { InputTypes } from '@features/AdaptivePage/components/SettingsForm/enums/InputTypes';
import { isFilledMediaValue } from '@features/AdaptivePage/components/SettingsForm/typeGuards/isFilledMediaValue';
import { useClasses } from '@features/AdaptivePage/components/SettingsForm/hooks/useClasses';

interface IProps {
  onSubmit: (item: IMediaValue) => void;
  warnings?: string[];
}

export const SettingsForm: React.FC<IProps> = ({
  onSubmit,
  warnings = [],
}) => {
  const [mediaValue, setMediaValue] = useState<IMediaValue<number | null>>(defaultMediaValue);
  const classes = useClasses();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFilledMediaValue(mediaValue)) {
      return;
    }

    onSubmit(mediaValue);
  };

  const onChangeHandler = getOnChangeHandler(setMediaValue);

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}
      noValidate={true}
      autoComplete='off'
    >
      <Box
        display='flex'
        p={1}>
        <TextField
          value={mediaValue.windowWidth.min ?? ''}
          label='Window width MIN'
          fullWidth={true}
          style={{ paddingRight: '5px' }}
          InputLabelProps={{
            className: classes.label,
          }}
          onChange={event => onChangeHandler({
            value: event.target.value,
            inputType: InputTypes.MIN,
          })}
          autoFocus={true}
        />
        <TextField
          value={mediaValue.windowWidth.max ?? ''}
          label='Window width MAX'
          fullWidth={true}
          style={{ paddingLeft: '5px' }}
          InputLabelProps={{
            className: classes.label,
          }}
          onChange={event => onChangeHandler({
            value: event.target.value,
            inputType: InputTypes.MAX,
          })}
        />
      </Box>

      <Box p={1}>
        <TextField
          value={mediaValue.value ?? ''}
          label='Value'
          fullWidth={true}
          InputLabelProps={{
            className: classes.label,
          }}
          onChange={event => onChangeHandler({
            value: event.target.value,
            inputType: InputTypes.VALUE,
          })}
        />
      </Box>

      <Box p={1}>
        <Button
          type='submit'
          variant='outlined'
          fullWidth={true}
          disableFocusRipple={true}
          disabled={!isFilledMediaValue(mediaValue)}
        >
          Submit
        </Button>

        {warnings?.map((warning, index) => (
          <Box key={index}>
            <Typography
              color='error'
              variant='caption'
            >
              {warning}
            </Typography>
          </Box>
        ))}
      </Box>
    </form>
  );
};
