import { useReducer } from 'react'
import { IAdaptiveFormState } from '../interfaces/IAdaptiveFormState'

const SET_HEIGHTS_WINDOW_RANGE_FROM = 'SET_HEIGHTS_WINDOW_RANGE_FROM'


const initialState: IAdaptiveFormState = {
    heights: null
}

const reducer = (state: IAdaptiveFormState = initialState, action: ActionsType): IAdaptiveFormState => {
    switch (action.type) {
        case 'SET_HEIGHTS_WINDOW_RANGE_FROM': {
        }
        default: {
            return initialState
        }
    }
}

type ActionsType = SetHeightsWindowRangeFromAction

type SetHeightsWindowRangeFromAction = {
    type: typeof SET_HEIGHTS_WINDOW_RANGE_FROM,
    payload: number
}
export const setHeightsWindowRangeFrom = (payload: number): SetHeightsWindowRangeFromAction => ({
    type: SET_HEIGHTS_WINDOW_RANGE_FROM,
    payload
})

export const useFormAdaptiveState = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return { state, dispatch }
}
