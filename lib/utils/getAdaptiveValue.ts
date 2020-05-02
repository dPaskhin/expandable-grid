import { IMediaValue } from '../interfaces/IMediaValue';
import { sortMediaValues } from './sortMediaValues';

export const getAdaptiveValue = (windowWidth: number, values: IMediaValue[]) => {
  const sortedValues = sortMediaValues(values);
  const maxValue = sortedValues[sortedValues.length - 1];
  const minValue = sortedValues[0];

  const currentValue = values.filter(value => (
    windowWidth >= value.windowWidth.min && windowWidth <= value.windowWidth.max
  ))[0];

  if (currentValue) {
    return currentValue.value;
  }

  if (windowWidth < minValue.windowWidth.min) {
    return minValue.value;
  }

  if (windowWidth > maxValue.windowWidth.max) {
    return maxValue.value;
  }

  return values[Math.round(values.length / 2) - 1].value;
};
