import { State } from "./Reducer";

export const getOperationInProgress = (state: State) => state.operationInProgress;
export const getInLineOperationInProgress = (state: State) => state.inLineOperationInProgress;