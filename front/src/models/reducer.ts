import Action from './actions';
import { GlobalState } from './store';

type DispatchArg = {
    action: Action,
    payload: any,
};

const reducer = (state: GlobalState, { action, payload }: DispatchArg) => {
    let newValues: Partial<GlobalState> = {};

    switch (action) {
        case Action.SET_READY:
            newValues.ready = true;
            return {
                ...state,
                ready: true
            };

        case Action.CHANGE_WEIGHT:
            const newState = {
                ...state,
                typeWeights: {
                    ...state.typeWeights,
                    [payload.placeType]: payload.weight,
                },
            };
            state.map.reloadAfter(newState);
            return newState;

        case Action.RELOAD_MAP:
            state.map.reloadAfter(state);
            return state;

        case Action.SET_ZOOM:
        default:
            throw new Error(`Invalid action: ${action}`);
    }
};

export default reducer;
