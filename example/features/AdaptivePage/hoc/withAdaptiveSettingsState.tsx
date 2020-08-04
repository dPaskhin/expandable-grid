import { Dispatch } from 'redux';
import { connect, InferableComponentEnhancer } from 'react-redux';

import { actions } from '@features/AdaptivePage/duck/slice';
import { DimensionsTypes } from '@src/enums/DimensionsTypes';
import { IRootState } from '@example/app/initStore';
import { IMediaValue } from '@features/AdaptivePage/interfaces/IMediaValue';
import { adaptiveDimensionsSelector } from '@features/AdaptivePage/duck/selectors';

const mapStateToProps = (state: IRootState) => ({
  adaptiveDimensions: adaptiveDimensionsSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAdaptiveValue: (dimensionType: DimensionsTypes, mediaValue: IMediaValue) => (
    dispatch(actions.setValue({ dimensionType, mediaValue }))
  ),
  deleteAdaptiveValue: (dimensionType: DimensionsTypes, valueId: number) => (
    dispatch(actions.deleteValue({ dimensionType, valueId }))
  ),
});

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = ReturnType<typeof mapDispatchToProps>;

export type IWithAdaptiveSettingsState = IStateProps & IDispatchProps;

export const withAdaptiveSettingsState: InferableComponentEnhancer<IWithAdaptiveSettingsState> = component => (
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component)
);
