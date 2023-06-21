import { ProjectComment } from "../BackendModels/ProjectComment";

export interface ProjectCommentResponse extends ProjectComment {
    name: string;
}