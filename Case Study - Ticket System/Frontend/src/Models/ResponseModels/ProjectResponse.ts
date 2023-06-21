import { Project } from "../BackendModels/Project";
import { ProjectCommentResponse } from "./ProjectCommentResponse";
import { TicketResponse } from "./TicketResponse";

export interface ProjectResponse extends Project {
    companyName: string;
    tickets?: TicketResponse[];
    comments?: ProjectCommentResponse[];
    contactPersonName: string;
    creatorName: string;
}