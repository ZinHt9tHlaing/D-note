export interface NoteType {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface DetailNoteType extends NoteType {
  creator: string;
}

export interface CreateNoteType {
  title: string;
  description: string;
}
