import { ID, Query } from "appwrite";

import { INewNote, INewUser, ISaveUserToDb, IUpdateNote } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDatabase({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imgUrl: avatarUrl,
      tags: [],
    });

    if (!newUser) throw Error;

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDatabase(user: ISaveUserToDb) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createNote(note: INewNote) {
  try {
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      ID.unique(),
      {
        user: note.userId,
        title: note.title,
        markdown: note.markdown,
        tags: note.tags,
      }
    );

    if (!newPost) {
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateNote(note: IUpdateNote) {
  try {
    const upadtedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      note.noteId,
      {
        title: note.title,
        markdown: note.markdown,
        tags: note.tags,
      }
    );

    if (!upadtedPost) {
      throw Error;
    }

    return upadtedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNoteById(noteId: string) {
  try {
    const deletedNote = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      noteId
    );

    return deletedNote;
  } catch (error) {
    console.log(error);
  }
}

export async function getNotes({ userId }: { userId: string }) {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      [Query.equal("user", userId), Query.orderDesc("$createdAt")]
    );

    return notes;
  } catch (error) {
    console.log(error);
  }
}

export async function getNoteById(noteId: string) {
  try {
    const note = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      noteId
    );

    return note;
  } catch (error) {
    console.log(error);
  }
}

export async function getTags(userId: string) {
  try {
    const tags = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId
    );

    if (typeof tags.documents === "undefined") {
      return tags.tags;
    } else {
      return tags.documents[0].tags;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateTags(userId: string, tags: string[]) {
  try {
    const newTags = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      {
        tags: tags,
      }
    );
    return newTags.tags;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function removeTagFromNotes(userId: string, tag: string) {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      [Query.equal("user", userId)]
    );

    notes.documents.forEach(async (note: any) => {
      if (note.tags.includes(tag)) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.notesCollectionId,
          note.$id,
          {
            tags: note.tags.filter((t: string) => t !== tag),
          }
        );
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateTagFromNotes(
  userId: string,
  oldTag: string,
  newTag: string
) {
  try {
    const notes = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.notesCollectionId,
      [Query.equal("user", userId)]
    );

    notes.documents.forEach(async (note: any) => {
      if (note.tags.includes(oldTag)) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.notesCollectionId,
          note.$id,
          {
            tags: [...note.tags.filter((t: string) => t !== oldTag), newTag],
          }
        );
      }
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
