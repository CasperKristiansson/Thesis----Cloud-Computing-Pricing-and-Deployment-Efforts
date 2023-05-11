export interface CreateTicketRequest {
    name: string;
    priority: string;
    assignedId: string;
    projectId: string;
    description: string;
}