import type { GetApiResponse, IQuestion } from "../../../types";
import { baseApi } from "../../api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (questionData) => ({
        url: "/questions",
        method: "POST",
        data: questionData,
      }),
      invalidatesTags: ["questions"],
    }),

    getQuestions: builder.query({
      query: (args: Record<string, unknown>) => ({
        url: "/questions",
        method: "GET",
        params: args,
      }),
      transformResponse: (response: GetApiResponse<IQuestion[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["questions"],
    }),

    getQuestionById: builder.query({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "GET",
      }),
      providesTags: ["questions"],
    }),

    updateQuestion: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        data: patch,
      }),
      invalidatesTags: ["questions"],
    }),

    softDeleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetQuestionsQuery,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
  useSoftDeleteQuestionMutation,
} = questionApi;
