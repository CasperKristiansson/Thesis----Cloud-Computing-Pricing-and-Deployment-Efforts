import { TicketComment } from "../BackendModels/TicketComment";

export interface TicketCommentResponse extends TicketComment {
    name: string;
}
