export interface NoteType {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  cover_image?: File | string;
}

export interface DetailNoteType extends NoteType {
  creator: string;
}

export interface CreateNoteType {
  note_id: string;
  title: string;
  description: string;
  cover_image?: File | string;
}

export type EditNoteType = CreateNoteType;
