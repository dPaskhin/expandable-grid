import { useMemo } from 'react';

import { checkWidthsGaps } from '@features/AdaptivePage/components/SettingsBlock/utils/checkWidthsGaps';
import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';

export const useFormWarnings = (mediaValues: IMediaValue[]) => useMemo(() => [
  ...mediaValues.length <= 1 ? ['It\'s preferable to add two and more values'] : [],
  ...(mediaValues.length && checkWidthsGaps(mediaValues))
    ? ['It\'s preferable do not make gaps between window widths']
    : [],
], [mediaValues]);
