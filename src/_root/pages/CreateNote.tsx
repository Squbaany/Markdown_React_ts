import NoteForm from "@/components/forms/NoteForm";

const CreateNote = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-col gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Create note</h2>
          <NoteForm action="create" />
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
