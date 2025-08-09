import { baseApi } from "../../api/baseApi";

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (questionData) => ({
        url: "/questions",
        method: "POST",
        data: questionData,
      }),
    }),

    getQuestions: builder.query({
      query: () => ({
        url: "/questions",
        method: "GET",
      }),
    }),

    getQuestionById: builder.query({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "GET",
      }),
    }),

    updateQuestion: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/questions/${id}`,
        method: "PATCH",
        data: patch,
      }),
    }),

    softDeleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
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
