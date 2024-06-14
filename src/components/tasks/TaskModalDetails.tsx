import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';


export default function TaskModalDetails() {

    const params = useParams();
    const projectId = params.projectId!;

    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const taskId = queryParams.get('viewTask')!;

    const show = taskId ? true : false;
    const close = () => navigate(location.pathname, { replace: true });

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] });
            queryClient.invalidateQueries({ queryKey: ['task', taskId] });
            toast.success(data);
            close();
        }
    });

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const data = {
            projectId,
            taskId,
            status
        };

        mutate(data);
    };

    if (isError) {
        toast.error(error.message, { toastId: 'error' });
        return <Navigate to={`/projects/${projectId}`} />;
    }

    if (data) return (
        <>
            <Transition appear show={show}>
                <Dialog as="div" className="relative z-10" onClose={close}>
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>

                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}</DialogTitle>

                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='font-bold text-2xl text-slate-600 my-5'>Historial de Cambios</p>

                                            <ul className='list-decimal'>
                                                {data.completedBy.map(activityLog => (
                                                    <li key={activityLog._id}>
                                                        <span className='font-bold text-slate-600'>{statusTranslations[activityLog.status]}</span>
                                                        {' '} por: {activityLog.user.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : null}
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>

                                        <select
                                            name="status"
                                            id="status"
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChangeStatus}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option
                                                    key={key}
                                                    value={key}
                                                >{value}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel
                                        notes={data.notes}
                                    />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}