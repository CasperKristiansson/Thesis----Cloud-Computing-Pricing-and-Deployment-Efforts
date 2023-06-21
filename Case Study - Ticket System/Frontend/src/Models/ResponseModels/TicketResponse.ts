import { Ticket } from "../BackendModels/Ticket";
import { TicketCommentResponse } from "./TicketCommentResponse";

export interface TicketResponse extends Ticket {
    assignedName: string;
    comments: TicketCommentResponse[];
    creatorName?: string;
    projectName?: string;
}