import NoteCard from "@/components/shared/NoteCard";
import { useUserContext } from "@/context/AuthContext";
import { useGetNotes } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useUserContext();
  const { data: notes, isPending: isLoadingNotes } = useGetNotes(user.id);
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="max-w-screen-lg flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="h3-bold md:h2-bold text-left w-full">Your notes</h2>
          <div className="items-center w-full">
            {isLoadingNotes && !notes ? (
              <Loader className="w-full" />
            ) : notes?.documents.length === 0 ? (
              <div className="flex items-center justify-center gap-2">
                <p className="base-medium text-light-4">
                  You don't have any notes yet.
                </p>
                <Link to="/create-note">Create one</Link>
              </div>
            ) : (
              <ul className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {notes?.documents.map((note: Models.Document) => (
                  <NoteCard note={note} key={note.$id} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
