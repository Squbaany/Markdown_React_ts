import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteNote,
  useGetNoteById,
} from "@/lib/react-query/queriesAndMutations";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";

const NoteDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { mutate: deleteNote } = useDeleteNote();

  const { data: note, isPending: isNoteLoading } = useGetNoteById(id || "");

  if (!isNoteLoading && note?.user.$id !== user.id) {
    navigate("/");
  }

  const handleDeleteNote = () => {
    deleteNote(id || "");
    navigate("/");
  };

  return (
    <div className="flex flex-1">
      <div className="notes_details-container">
        {isNoteLoading ? (
          <Loader />
        ) : (
          <div className="max-w-screen-lg flex flex-col items-center w-full gap-6 md:gap-9">
            <div className="flex flex-col-reverse md:flex-between w-full items-center">
              <div className="flex flex-col pt-10 md:pt-0 w-full items-center md:items-start">
                <h2 className="h3-bold md:h2-bold">{note?.title}</h2>
                <p className="subtle-semibold text-light-4">
                  {formatTimeAgo(note!.$createdAt)}
                </p>
              </div>
              <div className="w-full md:w-auto flex gap-3 items-center justify-end">
                <Link to={`/edit-note/${id}`}>
                  <Button className="shad-button_primary">Edit Note</Button>
                </Link>
                <Button
                  className="shad-button_danger"
                  onClick={handleDeleteNote}
                >
                  Delete Note
                </Button>
                <Button
                  className="shad-button_dark_4"
                  onClick={() => navigate("/")}
                >
                  Back
                </Button>
              </div>
            </div>

            <div className="flex w-full relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-transparent to-dark-1" />
              <div className="w-0">
                <ul className="flex gap-1 mt-5 h-8">
                  {note?.tags.map((tag: string) => (
                    <li
                      key={tag}
                      className="bg-dark-4 text-light-1 small-medium rounded-md border border-light-1-3 py-1 px-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full base-regular bg-dark-4 min-h-80 rounded-3xl">
              <ReactMarkdown className="p-5">{note?.markdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetails;
