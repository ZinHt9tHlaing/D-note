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
    createNote: builder.mutation<void, CreateNoteType>({
      query: (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.cover_image) {
          formData.append("cover_image", data.cover_image);
        }

        return {
          url: "/create",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Note"],
    }),

    updateNote: builder.mutation<void, { id: string; data: EditNoteType }>({
      query: ({ id, data }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        if (data.cover_image) {
          formData.append("cover_image", data.cover_image);
        }

        return {
          url: `/update-note/${id}`,
          method: "PUT",
          body: formData,
          credentials: "include",
        };
      },
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
