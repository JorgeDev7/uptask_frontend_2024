import { userAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import Spinner from "../spinner/Spinner";
import { useMemo } from "react";

type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = userAuth();
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

    if (isLoading) return <Spinner />;

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} | por: <span className="font-bold">{note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold transition-colors"
                >Eliminar</button>
            )}
        </div>
    );
}
