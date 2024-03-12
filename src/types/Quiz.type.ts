import { Question, QuestionRequest } from './Question.type';

export interface AddQuizRequest {
    title: string;
    description: string;
}

export interface QuizRespone {
    quizId: number;
    title: string;
    description: string;
    questions: Question[];
    steps: any[];
}

export interface updateQuizRequest {
    quizId: number;
    title: string;
    description: string;
    questions: QuestionRequest[];
}
