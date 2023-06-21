import { User } from "../Models/BackendModels/User";
import { createCompany } from "../Models/CreateCompany";
import { CreateProject } from "../Models/CreateProject";
import { CreateTicket } from "../Models/CreateTicket";
import { CLEAR_TOKEN, RESET_CREATE_COMPANY, RESET_CREATE_PROJECT, RESET_CREATE_TICKET, SET_CREATE_COMPANY_EMAIL, SET_CREATE_COMPANY_NAME, SET_CREATE_COMPANY_PRIMARY_CONTACT, SET_CREATE_PROJECT_ASSOCIATED_COMPANY, SET_CREATE_PROJECT_DESCRIPTION, SET_CREATE_PROJECT_NAME, SET_CREATE_TICKET_ASSIGNEE, SET_CREATE_TICKET_DESCRIPTION, SET_CREATE_TICKET_NAME, SET_CREATE_TICKET_PRIORITY, SET_CREATE_TICKET_PROJECT, SET_IN_LINE_OPERATION_IN_PROGRESS, SET_OPERATION_IN_PROGRESS, SET_TOKEN, SET_USER, UPLOAD_FILE_OPEN } from "./Actions";

export interface State {
    operationInProgress: boolean;
    inLineOperationInProgress: boolean;
    createProject: CreateProject;
    createTicket: CreateTicket;
    token: string;
    uploadFile: {open: boolean, id: string};
    createCompany: createCompany;
    user: User;
}

export const initialState: State = {
    operationInProgress: false,
    inLineOperationInProgress: false,
    createProject: {} as CreateProject,
    createTicket: {} as CreateTicket,
    token: localStorage.getItem('ats-token') || '',
    uploadFile: {open: false, id: ''},
    createCompany: {} as createCompany,
    user: {} as User,
};

export default function Reducer(state = initialState, { type, payload }: { type: string; payload?: any }) {
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
        case CLEAR_TOKEN:
            localStorage.removeItem('ats-token');
            return {
                ...state,
                token: '',
            };
        case RESET_CREATE_PROJECT:
            return {
                ...state,
                createProject: {} as CreateProject,
            };
        case RESET_CREATE_TICKET:
            return {
                ...state,
                createTicket: {} as CreateTicket,
            };
        case UPLOAD_FILE_OPEN:
            return {
                ...state,
                uploadFile: payload,
            };
        case SET_CREATE_COMPANY_NAME:
            return {
                ...state,
                createCompany: {
                    ...state.createCompany,
                    name: payload,
                },
            };
        case SET_CREATE_COMPANY_PRIMARY_CONTACT:
            return {
                ...state,
                createCompany: {
                    ...state.createCompany,
                    primaryContact: payload,
                },
            };
        case SET_CREATE_COMPANY_EMAIL:
            return {
                ...state,
                createCompany: {
                    ...state.createCompany,
                    email: payload,
                },
            };
        case RESET_CREATE_COMPANY:
            return {
                ...state,
                createCompany: {} as createCompany,
            };
        case SET_USER:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
}