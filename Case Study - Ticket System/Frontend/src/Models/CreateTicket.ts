export interface CreateTicket {
    name: string;
    priority: "Low" | "Medium" | "High";
    assignee: string;
    project: string;
    description: string;
}