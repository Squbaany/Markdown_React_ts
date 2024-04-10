import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNote,
  createUserAccount,
  deleteNoteById,
  getCurrentUser,
  getNoteById,
  getNotes,
  getTags,
  removeTagFromNotes,
  signInAccount,
  signOutAccount,
  updateNote,
  updateTagFromNotes,
  updateTags,
} from "../appwrite/api";

import { INewNote, INewUser, IUpdateNote } from "@/types";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: INewNote) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotes"],
      });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: IUpdateNote) => updateNote(note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getNoteById", data?.$id],
      });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: string) => deleteNoteById(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotes"],
      });
    },
  });
};

export const useGetNotes = (userId: string) => {
  return useQuery({
    queryKey: ["getNotes", userId],
    queryFn: () => getNotes({ userId }),
  });
};

export const useGetNoteById = (noteId: string) => {
  return useQuery({
    queryKey: ["getNoteById", noteId],
    queryFn: () => getNoteById(noteId),
  });
};

export const useGetTags = (userId: string) => {
  return useQuery({
    queryKey: ["getTags"],
    queryFn: () => getTags(userId),
  });
};

export const useUpdateTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, tags }: { userId: string; tags: string[] }) =>
      updateTags(userId, tags),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTags"],
      });
    },
  });
};

export const useRemoveTagFromNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, tag }: { userId: string; tag: string }) =>
      removeTagFromNotes(userId, tag),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTags"],
      });
    },
  });
};

export const useUpdateTagFromNotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      oldTag,
      newTag,
    }: {
      userId: string;
      oldTag: string;
      newTag: string;
    }) => updateTagFromNotes(userId, oldTag, newTag),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getNotes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTags"],
      });
    },
  });
};
