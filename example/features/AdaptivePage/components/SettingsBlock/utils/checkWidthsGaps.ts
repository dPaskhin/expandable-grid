import sortBy from 'lodash/sortBy';

import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

export const checkWidthsGaps = (mediaValues: IMediaValue[]) => {
  const widths = mediaValues.map(value => value.windowWidth);
  const sortedWidths = sortBy(widths, ['min', 'max']);
  const widthsMaxDiffer = sortedWidths[sortedWidths.length - 1].min - sortedWidths[0].max;
  const widthsPartSum = widths
    .slice(1, widths.length - 1)
    .reduce((acc, width) => acc + width.max - width.min, 0);
  const widthGaps = widthsMaxDiffer - widthsPartSum;

  return widthGaps > (widths.length - 1);
};
