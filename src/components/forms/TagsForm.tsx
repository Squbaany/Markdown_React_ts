import { useUserContext } from "@/context/AuthContext";
import {
  useGetTags,
  useRemoveTagFromNotes,
  useUpdateTagFromNotes,
  useUpdateTags,
} from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const TagsForm = () => {
  const { user } = useUserContext();

  const { mutateAsync: updateTags } = useUpdateTags();
  const { mutateAsync: removeTag } = useRemoveTagFromNotes();
  const { mutateAsync: updateTag } = useUpdateTagFromNotes();

  const {
    data: tags,
    isPending: isLoadingTags,
    isRefetching,
  } = useGetTags(user.id);

  async function handleUpdate(oldTag: string, newTag: string) {
    console.log([...tags.filter((t: string) => t !== oldTag), newTag]);
    const tagRemoved = await updateTag({ userId: user.id, oldTag, newTag });

    if (!tagRemoved) new Error();

    const updatedTags = await updateTags({
      userId: user.id,
      tags: [...tags.filter((t: string) => t !== oldTag), newTag],
    });

    if (!updatedTags) new Error();
  }

  async function handleDelete(tag: string) {
    const tagRemoved = await removeTag({ userId: user.id, tag });

    if (!tagRemoved) new Error();

    const updatedTags = await updateTags({
      userId: user.id,
      tags: tags.filter((t: string) => t !== tag),
    });

    if (!updatedTags) new Error();
  }

  return (
    <div className="w-full items-center justify-center">
      {isLoadingTags || isRefetching ? (
        <Loader className="w-full" />
      ) : tags.length === 0 ? (
        <div className="flex items-center justify-center gap-2 mt-8">
          <p className="base-medium text-light-4">
            You don't have any notes yet.
          </p>
          <Link to="/create-note">Create one</Link>
        </div>
      ) : (
        <>
          {tags?.map((tag: string) => (
            <div key={tag} className="flex gap-2 w-full my-4">
              <Input
                id={tag}
                type="text"
                defaultValue={tag}
                onBlur={(e) => handleUpdate(tag, e.target.value)}
                className="shad-input"
              />
              <div className="flex gap-2 items-center justify-center">
                <Button
                  className="shad-button_danger"
                  onClick={() => handleDelete(tag)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TagsForm;
