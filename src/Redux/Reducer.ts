import { Theme, initializeTheme } from "../Styling/Theme";

if (localStorage['darkMode'] == null) localStorage['darkMode'] = 'false';

export interface State {
    operationInProgress: boolean;
    inLineOperationInProgress: boolean;
    darkMode: boolean;
    theme: Theme
}

export const initialState: State = {
    operationInProgress: true,
    inLineOperationInProgress: false,
    darkMode: localStorage['darkMode'],
    theme: initializeTheme(localStorage['darkMode'])
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
        case 'SET_DARK_MODE':
            localStorage['darkMode'] = payload;
            return {
                ...state,
                darkMode: payload,
                theme: initializeTheme(payload)
            };
        default:
            return state;
    }
}