import { apiSlice } from "../apiSlice";

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps extends LoginProps {
  username: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterProps) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (data: LoginProps) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;
