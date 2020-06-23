import Action from './actions';

type DispatchArg = {
    action: Action,
    payload: any,
};

const reducer = (oldState: any, { action, payload }: DispatchArg) => {
    const newValues = {};

    switch (action) {
        case Action.SET_READY:
            console.log('ready');
            newValues.ready = true;
            break;
        default:
            throw new Error(`Invalid action: ${action}`);
    }

    return {
        ...oldState,
        ...newValues,
    };
};

export default reducer;
