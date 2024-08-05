import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, selectCurrentToken } from '../features/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const token = selectCurrentToken(api.getState());
      api.dispatch(setCredentials({ ...refreshResult.data, token }));
  
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.seedley.net',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token
    if (token) {

      headers.set("authorization", `Bearer ${token}`);
    }
    if (!token) {
   
      headers.set("authorization", `Bearer 555`);
    }
    return headers;
  }
});

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    uploadLeads: builder.mutation({
      query: (user) => ({
        url: "/uploadLeads",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, 
    }),     
  }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/user/put-user",
        method: "PUT",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    addNumber: builder.mutation({
      query: (body) => ({
        url: "/phone/saveNumber",
        method: "POST",
        body,
      }),
    }),

    deleteNumber: builder.mutation({
      query: (body) => ({
        url: "/phone/deleteNumber",
        method: "DELETE",
        body,
      }),
    }),

    addAssistant: builder.mutation({
      query: (assistant) => ({
        url: "/assistant/addAssistant",
        method: "POST",
        body:assistant,
      }),
    }),

    updateAssistant: builder.mutation({
      query: (body) => ({
        url: "/assistant/updateAssistant",
        method: "POST",
        body,
      }),
    }),

    deleteAssistant: builder.mutation({
      query: (body) => ({
        url: "/assistant/deleteAssistant",
        method: "DELETE",
        body,
      }),
    }),

    updateTeam: builder.mutation({
      query: (team) => ({
        url: "/user/update-team",
        body: team,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUpdateTeamMutation,
  useAddAssistantMutation,
  useUpdateAssistantMutation,
  useSignupMutation,
  useUploadLeadsMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useAddNumberMutation,
  useDeleteNumberMutation,
  useDeleteAssistantMutation,
} = appApi;

export default appApi;