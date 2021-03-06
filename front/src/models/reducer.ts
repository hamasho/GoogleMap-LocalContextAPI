import Action from './actions';
import { GlobalState } from './store';

type DispatchArg = {
    action: Action,
    payload: any,
};

const reducer = (state: GlobalState, { action, payload }: DispatchArg) => {
    let newValues: Partial<GlobalState> = {};
    let newState;

    switch (action) {
        case Action.SET_READY:
            newValues.ready = true;
            return {
                ...state,
                ready: true
            };

        case Action.CHANGE_WEIGHT:
            newState = {
                ...state,
                typeWeights: {
                    ...state.typeWeights,
                    [payload.placeType]: payload.weight,
                },
            };
            return newState;

        case Action.RELOAD_MAP:
            newState = state.map.updateState(state);
            state.map.reloadAfter(newState);
            return newState;

        default:
            throw new Error(`Invalid action: ${action}`);
    }
};

export default reducer;
