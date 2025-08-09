import type { GetApiResponse, ICompetency } from "../../../types";
import { baseApi } from "../../api/baseApi";

const competencyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompetencies: builder.query<
      GetApiResponse<ICompetency[]>,
      Record<string, unknown> | void
    >({
      query: (args) => ({
        url: "/competency",
        method: "GET",
        params: args || {},
      }),
      transformResponse: (response: GetApiResponse<ICompetency[]>) => response,
      providesTags: ["competency"],
    }),

    getCompetencyById: builder.query<ICompetency, string>({
      query: (id) => ({
        url: `/competency/${id}`,
        method: "GET",
      }),
      providesTags: ["competency"],
    }),

    createCompetency: builder.mutation<ICompetency, Partial<ICompetency>>({
      query: (competencyData) => ({
        url: "/competency",
        method: "POST",
        data: competencyData,
      }),
      invalidatesTags: ["competency"],
    }),

    updateCompetency: builder.mutation<
      ICompetency,
      { id: string; patch: Partial<ICompetency> }
    >({
      query: ({ id, patch }) => ({
        url: `/competency/${id}`,
        method: "PATCH",
        data: patch,
      }),
      invalidatesTags: ["competency"],
    }),

    deleteCompetency: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/competency/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["competency"],
    }),
  }),
});

export const {
  useGetCompetenciesQuery,
  useGetCompetencyByIdQuery,
  useCreateCompetencyMutation,
  useUpdateCompetencyMutation,
  useDeleteCompetencyMutation,
} = competencyApi;

export default competencyApi;
