import { State } from "./Reducer";

export const getOperationInProgress = (state: State) => state.operationInProgress;
export const getInLineOperationInProgress = (state: State) => state.inLineOperationInProgress;
export const getTheme = (state: State) => state.theme;
export const getDarkMode = (state: State) => state.darkMode;