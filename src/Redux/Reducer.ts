import { CreateProject } from "../Models/CreateProject";
import { CreateTicket } from "../Models/CreateTicket";
import { SET_CREATE_PROJECT_ASSOCIATED_COMPANY, SET_CREATE_PROJECT_DESCRIPTION, SET_CREATE_PROJECT_NAME, SET_CREATE_TICKET_ASSIGNEE, SET_CREATE_TICKET_DESCRIPTION, SET_CREATE_TICKET_NAME, SET_CREATE_TICKET_PRIORITY, SET_CREATE_TICKET_PROJECT, SET_IN_LINE_OPERATION_IN_PROGRESS, SET_OPERATION_IN_PROGRESS, SET_TOKEN } from "./Actions";

export interface State {
    operationInProgress: boolean;
    inLineOperationInProgress: boolean;
    createProject: CreateProject;
    createTicket: CreateTicket;
    token: string;
}

export const initialState: State = {
    operationInProgress: false,
    inLineOperationInProgress: false,
    createProject: {} as CreateProject,
    createTicket: {} as CreateTicket,
    token: localStorage.getItem('ats-token') || '',
};

export default function Reducer(state = initialState, { type, payload }: { type: string; payload: any }) {
    switch (type) {
        case SET_OPERATION_IN_PROGRESS:
            return {
                ...state,
                operationInProgress: payload,
            };
        case SET_IN_LINE_OPERATION_IN_PROGRESS:
            return {
                ...state,
                inLineOperationInProgress: payload,
            };
        case SET_CREATE_PROJECT_NAME:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    name: payload,
                },
            };
        case SET_CREATE_PROJECT_DESCRIPTION:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    description: payload,
                },
            };
        case SET_CREATE_PROJECT_ASSOCIATED_COMPANY:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    associatedCompany: payload,
                },
            };
        case SET_CREATE_TICKET_NAME:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    name: payload,
                },
            };
        case SET_CREATE_TICKET_ASSIGNEE:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    assignee: payload,
                },
            };
        case SET_CREATE_TICKET_DESCRIPTION:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    description: payload,
                },
            };
        case SET_CREATE_TICKET_PRIORITY:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    priority: payload,
                },
            };
        case SET_CREATE_TICKET_PROJECT:
            return {
                ...state,
                createTicket: {
                    ...state.createTicket,
                    project: payload,
                },
            };

        case SET_TOKEN:
            localStorage.setItem('ats-token', payload);
            return {
                ...state,
                token: payload,
            };

        default:
            return state;
    }
}