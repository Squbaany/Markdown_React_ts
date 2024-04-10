import TagsForm from "@/components/forms/TagsForm";

const EditTags = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-screen-md flex-col gap-3 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit tags</h2>
          <TagsForm />
        </div>
      </div>
    </div>
  );
};

export default EditTags;
