import { State } from "./Reducer";

export const getOperationInProgress = (state: State) => state.operationInProgress;
export const getInLineOperationInProgress = (state: State) => state.inLineOperationInProgress;

export const getCreateProjectName = (state: State) => state.createProject.name;
export const getCreateProjectDescription = (state: State) => state.createProject.description;
export const getCreateProjectAssociatedCompany = (state: State) => state.createProject.associatedCompany;