export interface State {
    operationInProgress: boolean;
    inLineOperationInProgress: boolean;
}

export const initialState: State = {
    operationInProgress: false,
    inLineOperationInProgress: false,
};

export default function Reducer(state = initialState, { type, payload }: { type: string; payload: any }) {
    switch (type) {
        case 'SET_OPERATION_IN_PROGRESS':
            return {
                ...state,
                operationInProgress: payload,
            };
        case 'SET_IN_LINE_OPERATION_IN_PROGRESS':
            return {
                ...state,
                inLineOperationInProgress: payload,
            };
        default:
            return state;
    }
}