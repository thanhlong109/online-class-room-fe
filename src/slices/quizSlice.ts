import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { QuizRespone } from '../types/Quiz.type';
import { Question } from '../types/Question.type';

export interface AuthToken {
    quizList: QuizRespone[];
}

const initialState: AuthToken = {
    quizList: [],
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizList: (state, action: PayloadAction<QuizRespone[]>) => {
            state.quizList = action.payload;
        },
        upsertQuiz: (state, action: PayloadAction<QuizRespone>) => {
            const index = state.quizList.findIndex((quiz) => quiz.quizId === action.payload.quizId);
            if (index != -1) {
                state.quizList[index] = action.payload;
            } else {
                state.quizList.push(action.payload);
            }
        },
        deleteQuiz: (state, action: PayloadAction<number>) => {
            const index = state.quizList.findIndex((quiz) => quiz.quizId === action.payload);
            if (index != -1) {
                state.quizList.splice(index, 1);
            }
        },
        updateQuizTile: (state, action: PayloadAction<{ title: string; quizId: number }>) => {
            const index = state.quizList.findIndex((quiz) => quiz.quizId === action.payload.quizId);
            if (index != -1) {
                state.quizList[index].title = action.payload.title;
            }
        },
        updateQuizDescription: (
            state,
            action: PayloadAction<{ description: string; quizId: number }>,
        ) => {
            const index = state.quizList.findIndex((quiz) => quiz.quizId === action.payload.quizId);
            if (index != -1) {
                state.quizList[index].description = action.payload.description;
            }
        },
        upsertQuestion: (state, action: PayloadAction<{ quizId: number; question: Question }>) => {
            const index = state.quizList.findIndex((quiz) => quiz.quizId === action.payload.quizId);
            if (index != -1) {
                const questionIndex = state.quizList[index].questions.findIndex(
                    (question) => question.questionId === action.payload.question.questionId,
                );
                if (questionIndex != -1) {
                    state.quizList[index].questions[questionIndex] = action.payload.question;
                } else {
                    state.quizList[index].questions.push(action.payload.question);
                }
            }
        },
        deleteQuestion: (state, action: PayloadAction<{ quizId: number; questionId: number }>) => {
            const index = state.quizList.findIndex((quiz) => quiz.quizId === action.payload.quizId);
            if (index != -1) {
                const questionIndex = state.quizList[index].questions.findIndex(
                    (question) => question.questionId === action.payload.questionId,
                );
                if (questionIndex != -1) {
                    state.quizList[index].questions.splice(questionIndex, 1);
                }
            }
        },
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const {
    deleteQuiz,
    setQuizList,
    updateQuizDescription,
    updateQuizTile,
    upsertQuiz,
    upsertQuestion,
    deleteQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
