import type {
  CreateNoteType,
  DetailNoteType,
  EditNoteType,
  NoteType,
} from "../../../types/noteType";
import { apiSlice } from "../apiSlice";

const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<NoteType[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Note"],
    }),
    getDetailNote: builder.query<DetailNoteType, string>({
      query: (id) => ({
        url: `/note/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Note"],
    }),
    createNote: builder.mutation({
      query: (data: CreateNoteType) => ({
        url: "/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation<void, { id: string; data: EditNoteType }>({
      query: ({ id, data }) => ({
        url: `/update-note/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (id: string) => ({
        url: `/delete-note/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetDetailNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApiSlice;
