import { Project } from "../BackendModels/Project";

export interface ProjectResponse extends Project {
    companyName: string;
}