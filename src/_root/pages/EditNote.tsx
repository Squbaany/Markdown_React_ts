import NoteForm from "@/components/forms/NoteForm";
import { useGetNoteById } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const { data: note, isPending: isNoteLoading } = useGetNoteById(id || "");

  if (isNoteLoading) return <Loader />;

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-col gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit note</h2>
          <NoteForm action="update" note={note} />
        </div>
      </div>
    </div>
  );
};

export default EditNote;
