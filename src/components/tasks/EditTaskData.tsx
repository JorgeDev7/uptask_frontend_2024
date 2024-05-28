import { useLocation, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
    const params = useParams();
    const projectId = params.projectId!;

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const taskId = queryParams.get('editTask')!;

    const { data } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ taskId, projectId }),
        enabled: !!taskId
    });

    if (data) return (
        <EditTaskModal />
    );
}
