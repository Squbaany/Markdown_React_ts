import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

type NoteCardProps = {
  note: Models.Document;
};

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div className="rounded-3xl border border-dark-4 w-full max-w-screen-sm group hover:-translate-y-1 duration-200">
      <Link to={`/notes/${note.$id}`}>
        <div className="bg-dark-3 p-5 lg:p-8 rounded-3xl group-hover:shadow-md group-hover:shadow-white duration-300">
          <p className="small-regular text-light-4">
            {formatTimeAgo(note.$createdAt)}
          </p>
          <h3 className="h3-bold md:h2-bold">{note.title}</h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-transparent to-dark-3  duration-300"></div>
            <ul className="relative z-1 flex gap-1 mt-5 overflow-hidden h-8">
              {note.tags.map((tag: string) => (
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
      </Link>
    </div>
  );
};

export default NoteCard;
