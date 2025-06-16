import { apiSlice } from "../apiSlice";

interface RegisterProps {
  email: string;
  username: string;
  password: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterProps) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApiSlice;
