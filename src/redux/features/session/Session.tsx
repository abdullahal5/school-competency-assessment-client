/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  GetApiResponse,
  ITestSession,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const testSessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTestSession: builder.mutation<ITestSession, Partial<ITestSession>>({
      query: (testSessionData) => ({
        url: "/test-sessions",
        method: "POST",
        data: testSessionData,
      }),
      invalidatesTags: ["testSessions"],
    }),

    submitTestSession: builder.mutation<void, ITestSession>({
      query: (submissionData) => ({
        url: "/test-sessions/submit",
        method: "POST",
        data: submissionData,
      }),
    }),

    getTestSessions: builder.query<
      { data: ITestSession[]; meta: any },
      Record<string, unknown>
    >({
      query: (params) => ({
        url: "/test-sessions",
        method: "GET",
        params,
      }),
      transformResponse: (response: GetApiResponse<ITestSession[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["testSessions"],
    }),

    getTestSessionById: builder.query<ITestSession, string>({
      query: (id) => ({
        url: `/test-sessions/${id}`,
        method: "GET",
      }),
      providesTags: ["testSessions"],
    }),

    updateTestSession: builder.mutation<
      ITestSession,
      { id: string; patch: Partial<ITestSession> }
    >({
      query: ({ id, patch }) => ({
        url: `/test-sessions/${id}`,
        method: "PATCH",
        data: patch,
      }),
      invalidatesTags: ["testSessions"],
    }),

    deleteTestSession: builder.mutation<void, string>({
      query: (id) => ({
        url: `/test-sessions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["testSessions"],
    }),
  }),
});

export const {
  useCreateTestSessionMutation,
  useSubmitTestSessionMutation,
  useGetTestSessionsQuery,
  useGetTestSessionByIdQuery,
  useUpdateTestSessionMutation,
  useDeleteTestSessionMutation,
} = testSessionApi;
