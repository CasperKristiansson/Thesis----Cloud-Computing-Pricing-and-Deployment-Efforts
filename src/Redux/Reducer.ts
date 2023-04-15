import { CreateProject } from "../Models/CreateProject";
import { SET_CREATE_PROJECT_ASSOCIATED_COMPANY, SET_CREATE_PROJECT_DESCRIPTION, SET_CREATE_PROJECT_NAME, SET_IN_LINE_OPERATION_IN_PROGRESS, SET_OPERATION_IN_PROGRESS } from "./Actions";

export interface State {
    operationInProgress: boolean;
    inLineOperationInProgress: boolean;
    createProject: CreateProject;
}

export const initialState: State = {
    operationInProgress: false,
    inLineOperationInProgress: false,
    createProject: {} as CreateProject,
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
        default:
            return state;
    }
}