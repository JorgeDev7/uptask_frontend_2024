import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
    formData: NoteFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    noteId: Note['_id'];
};

export async function createNote({ projectId, taskId, formData }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data.error);
        }
    }
}