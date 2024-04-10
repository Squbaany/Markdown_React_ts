import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import CreatableSelect from "react-select/creatable";

import { Models } from "appwrite";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { NoteValidation } from "@/lib/validation";
import {
  useCreateNote,
  useGetTags,
  useUpdateNote,
  useUpdateTags,
} from "@/lib/react-query/queriesAndMutations";
import { FormTag } from "@/types";
import { useEffect, useState } from "react";

type NoteFormProps = {
  note?: Models.Document;
  action: "create" | "update";
};

const NoteForm = ({ note, action }: NoteFormProps) => {
  const { mutateAsync: createNote, isPending: isLoadingCreate } =
    useCreateNote();
  const { mutateAsync: updateNote, isPending: isLoadingUpdate } =
    useUpdateNote();
  const { mutateAsync: updateTags } = useUpdateTags();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    data: tags,
    isPending: isLoadingTags,
    isRefetching,
  } = useGetTags(user.id);

  const [options, setOptions] = useState<FormTag[]>([]);

  useEffect(() => {
    setOptions(
      tags?.map((tag: string) => ({
        value: tag,
        label: tag,
      })) as FormTag[]
    );
  }, [isLoadingTags, isRefetching]);

  const form = useForm<z.infer<typeof NoteValidation>>({
    resolver: zodResolver(NoteValidation),
    defaultValues: {
      title: note ? note?.title : "",
      markdown: note ? note?.markdown : "",
      tags: note
        ? (note?.tags.map((tag: string) => ({
            value: tag,
            label: tag,
          })) as FormTag[])
        : [],
    },
  });

  async function onSubmit(values: z.infer<typeof NoteValidation>) {
    const tags = values.tags.map((tag) => tag.label) as string[];

    if (note && action === "update") {
      const updatednote = await updateNote({
        title: values.title,
        markdown: values.markdown,
        tags: tags,
        noteId: note.$id,
      });

      if (!updatednote) {
        toast({ title: "Someting went wrong. Please try again" });
      }

      console.log(updatednote);

      return navigate(`/notes/${note.$id}`);
    }

    const newNote = await createNote({
      title: values.title,
      markdown: values.markdown,
      tags: tags,
      userId: user.id,
    });

    if (!newNote) {
      toast({
        title: "Something went wrong. Please try again",
      });
    }

    navigate("/");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full maw-w-5xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add title</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="shad-input" />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="markdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Note</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className="shad-form_label">Tags</FormLabel>
          <Controller
            control={form.control}
            name="tags"
            render={({ field }) => {
              return (
                <CreatableSelect
                  options={isLoadingTags ? [] : options}
                  onCreateOption={async (inputValue) => {
                    field.value.push({ value: inputValue, label: inputValue });
                    await updateTags({
                      userId: user.id,
                      tags: [...tags, inputValue],
                    });
                    field.onChange(field.value);
                  }}
                  {...field}
                  isMulti
                  isClearable
                  className="my-react-select-container"
                  classNamePrefix="my-react-select"
                />
              );
            }}
          />
        </FormItem>
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate || isLoadingTags) && (
              <Loader />
            )}
            {action === "create" ? "Create note" : "Update note"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NoteForm;
