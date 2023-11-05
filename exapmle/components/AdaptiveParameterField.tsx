import { Dispatch, FC, ReactNode, useEffect, useState } from 'react';
import { IconButton, List, ListItem, ListItemButton, ListSubheader, Stack } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { PositiveNumberField } from './PositiveNumberField';
import { MediaQueryParametersMap } from '../../src/main';

interface WindowWidthParameter {
  width: number;
  value: number;
}

interface IProps {
  defaultValue: MediaQueryParametersMap;
  onSubmitted: Dispatch<MediaQueryParametersMap>;
  label: ReactNode;
}

export const AdaptiveParameterField: FC<IProps> = ({ defaultValue, onSubmitted, label }) => {
  const [value, setValue] = useState<WindowWidthParameter[]>(toWindowWidthParameters(defaultValue));
  const [pendingParameter, setPendingParameter] = useState<WindowWidthParameter>();

  useEffect(() => {
    onSubmitted(fromWindowWidthParameters(value));
  }, [value]);

  return (
    <List subheader={<ListSubheader>{label}</ListSubheader>}>
      {value.map((parameter) => (
        <ListItem
          key={parameter.width}
          secondaryAction={
            <IconButton
              disabled={value.length <= 1}
              onClick={() => setValue((prev) => deleteParameterByWindowWidth(prev, parameter.width))}
            >
              <CloseRounded />
            </IconButton>
          }
        >
          <Stack>
            {parameter.width} - {parameter.value}
          </Stack>
        </ListItem>
      ))}

      {!pendingParameter ? (
        <ListItemButton onClick={() => setPendingParameter({ value: 0, width: 0 })}>
          {'Add an adaptive parameter'}
        </ListItemButton>
      ) : (
        <>
          <ListItem>
            <Stack
              direction={'row'}
              columnGap={1}
            >
              <PositiveNumberField
                label={"Window's width"}
                value={pendingParameter.width}
                onChange={(value) => setPendingParameter({ width: value, value: pendingParameter.value })}
              />
              <PositiveNumberField
                label={label}
                value={pendingParameter.value}
                onChange={(value) => setPendingParameter({ width: pendingParameter?.width, value })}
              />
            </Stack>
          </ListItem>

          <ListItemButton
            onClick={() => {
              setValue((prev) => addParameter(prev, pendingParameter));
              setPendingParameter(undefined);
            }}
          >
            {'Submit'}
          </ListItemButton>
        </>
      )}
    </List>
  );
};

function deleteParameterByWindowWidth(parameters: WindowWidthParameter[], windowWidth: number): WindowWidthParameter[] {
  return parameters.filter((parameter) => windowWidth !== parameter.width);
}

function addParameter(parameters: WindowWidthParameter[], parameter: WindowWidthParameter): WindowWidthParameter[] {
  let res = parameters.slice();

  const existingParameter = parameters.find(({ width }) => parameter.width === width);

  if (existingParameter) {
    existingParameter.value = parameter.value;

    return res;
  }

  res.push(parameter);

  res.sort((a, b) => a.width - b.width);

  return res;
}

function fromWindowWidthParameters(value: WindowWidthParameter[]): MediaQueryParametersMap {
  return Object.fromEntries(value.map((parameter) => [parameter.width, parameter.value]));
}

function toWindowWidthParameters(value: MediaQueryParametersMap): WindowWidthParameter[] {
  return Object.entries(value).map(([width, value]) => ({ width: Number.parseInt(width, 10), value }));
}
