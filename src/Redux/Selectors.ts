import { State } from "./Reducer";

export const getOperationInProgress = (state: State) => state.operationInProgress;
export const getInLineOperationInProgress = (state: State) => state.inLineOperationInProgress;

export const getCreateProject = (state: State) => state.createProject;
export const getCreateProjectName = (state: State) => state.createProject.name;
export const getCreateProjectDescription = (state: State) => state.createProject.description;
export const getCreateProjectAssociatedCompany = (state: State) => state.createProject.associatedCompany;

export const getCreateTicket = (state: State) => state.createTicket;
export const getCreateTicketName = (state: State) => state.createTicket.name;
export const getCreateTicketPriority = (state: State) => state.createTicket.priority;
export const getCreateTicketAssignee = (state: State) => state.createTicket.assignee;
export const getCreateTicketProject = (state: State) => state.createTicket.project;
export const getCreateTicketDescription = (state: State) => state.createTicket.description;
