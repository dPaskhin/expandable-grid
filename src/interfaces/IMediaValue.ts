export interface IMediaValue<T = number> {
  windowWidth: { min: T; max: T };
  value: T;
}
