export type MediaQueryParametersMap = Record<string, number>;

export type MediaQueryValue = number | MediaQueryParametersMap;

const ParameterKeys = ['rowGap', 'columnGap', 'itemHeight', 'expandedItemHeight'] as const;

type ParameterKeys = (typeof ParameterKeys)[number];

type Parameters = Record<ParameterKeys, number>;

export interface NormalizedParameters extends Parameters {
  outerItemHeight: number;
  outerExpandedItemHeight: number;
  expandedExtraHeight: number;
}

export type ExpandableGridParameters = Partial<Record<ParameterKeys, MediaQueryValue>>;

const DEFAULT_PARAMETERS: Parameters = {
  rowGap: 20,
  columnGap: 20,
  itemHeight: 150,
  expandedItemHeight: 350,
};

export function normalizeParameters(
  parameters: ExpandableGridParameters | undefined,
  windowWidth: number
): NormalizedParameters {
  let res: Partial<Parameters> = {};

  for (const key in parameters) {
    if (!isParameterKey(key)) {
      continue;
    }

    let value = parameters[key];

    if (typeof value === 'number') {
      res[key] = value;
    }

    if (typeof value !== 'object' || value == null) {
      continue;
    }

    value = cleanNonNumberKeys(value);

    if (isObjectEmpty(value)) {
      continue;
    }

    res[key] = findNearestMediaQueryValue(value, windowWidth);
  }

  return enhanceParameters(res);
}

export function normalizeColumnsCount(columnsCount: MediaQueryValue, windowWidth: number): number {
  if (typeof columnsCount === 'number') {
    return columnsCount;
  }

  if (typeof columnsCount !== 'object' || columnsCount == null) {
    return 0;
  }

  columnsCount = cleanNonNumberKeys(columnsCount);

  if (isObjectEmpty(columnsCount)) {
    return 0;
  }

  return findNearestMediaQueryValue(columnsCount, windowWidth) ?? 0;
}

function findNearestMediaQueryValue(
  mediaQueryParametersMap: MediaQueryParametersMap,
  windowWidth: number
): number | undefined {
  const queryEntries = Object.entries(mediaQueryParametersMap).sort(
    ([a], [b]) => Number.parseInt(b, 10) - Number.parseInt(a, 10)
  );

  const res = queryEntries.at(-1)![1];

  for (const [width, value] of queryEntries) {
    if (windowWidth >= Number.parseInt(width, 10)) {
      return value;
    }
  }

  return res;
}

function enhanceParameters(parameters: Partial<Parameters>): NormalizedParameters {
  const normalized: NormalizedParameters = Object.assign(
    {},
    DEFAULT_PARAMETERS,
    {
      outerItemHeight: DEFAULT_PARAMETERS.rowGap + DEFAULT_PARAMETERS.itemHeight,
      outerExpandedItemHeight: DEFAULT_PARAMETERS.rowGap + DEFAULT_PARAMETERS.expandedItemHeight,
      expandedExtraHeight: DEFAULT_PARAMETERS.expandedItemHeight - DEFAULT_PARAMETERS.itemHeight,
    },
    parameters
  );

  normalized.outerItemHeight = normalized.itemHeight + normalized.rowGap;
  normalized.outerExpandedItemHeight = normalized.expandedItemHeight + normalized.rowGap;
  normalized.expandedExtraHeight = normalized.expandedItemHeight - normalized.itemHeight;

  return normalized;
}

function isParameterKey(value: string): value is ParameterKeys {
  return ParameterKeys.includes(value as ParameterKeys);
}

function cleanNonNumberKeys(value: MediaQueryParametersMap): MediaQueryParametersMap {
  const res: MediaQueryParametersMap = {};

  for (const key in value) {
    if (Number.isNaN(Number.parseInt(key, 10))) {
      continue;
    }

    res[key] = value[key]!;
  }

  return res;
}

function isObjectEmpty(obj: object): boolean {
  return Object.entries(obj).length === 0;
}
