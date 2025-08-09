export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GetApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta: IMeta;
}

export interface IQuestion {
  _id?: string;
  competency: string;
  level: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  points: number;
  explanation?: string;
  isMultipleChoice?: boolean;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICompetency {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect?: boolean;
  pointsAwarded?: number;
}

export interface ITestSession {
  _id: string;
  userId: string;
  name: string;
  currentStep: 1 | 2 | 3;
  startTime: Date;
  endTime?: Date;
  questions: string[];
  score?: number;
  certificationLevel?:
    | "A1"
    | "A2"
    | "B1"
    | "B2"
    | "C1"
    | "C2"
    | null
    | undefined
    | string;
  isRetakeAllowed: boolean;
  timePerQuestion: number;
  autoSubmitted: boolean;
  totalSubmitted: number;
  submittedUsers: string[];
  browserRestricted: boolean;
  videoRecording: boolean;
  deadline: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubmitTestSessionParams {
  sessionId: string;
  answers: IAnswer[];
  autoSubmitted?: boolean;
}

export interface SubmitTestSessionResult {
  session: ITestSession;
  autoSubmitted: boolean;
  certificationLevel?: string | null;
}