import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Course, Step } from '../types/Course.type';
import { QuizRespone } from '../types/Quiz.type';

export enum LessionType {
    QUIZ,
    VIDEO,
}

export interface QuestionData {
    correctAnswer: number;
    userSelectedAnswer: number;
    questionId: number;
}

export interface learningCourseSliceData {
    learningCourse: Course;
    stepActive: Step;
    stepActiveType: LessionType;
    quizAnswer: QuestionData[];
    isShowAnswer: boolean;
    temp: {
        tempActiveStepIndex: number;
        tempActiveSectionIndex: number;
    };
}
const initialStep: Step = {
    duration: 0,
    position: 0,
    quiz: '',
    quizId: 1,
    section: '',
    sectionId: -1,
    stepDescription: '',
    stepId: -1,
    title: '',
    videoUrl: '',
};
const initialCourse: Course = {
    courseIsActive: false,
    description: '',
    imageUrl: 'string',
    isPublic: false,
    knowdledgeDescription: '',
    linkCertificated: 'string',
    price: 0,
    salesCampaign: 0,
    title: '',
    totalDuration: 0,
    videoPreviewUrl: 'string',
    courseCategories: [],
    courseId: 0,
    createAt: '',
    linkCertificateAccounts: [],
    orders: [],
    publicAt: '',
    registrationCourses: [],
    sections: [],
    updateAt: '',
    wishLists: [],
};

const initialState: learningCourseSliceData = {
    learningCourse: initialCourse,
    stepActive: initialStep,
    stepActiveType: LessionType.VIDEO,
    quizAnswer: [],
    isShowAnswer: false,
    temp: {
        tempActiveSectionIndex: 0,
        tempActiveStepIndex: 0,
    },
};

export const learningCourseSlice = createSlice({
    name: 'learningCourse',
    initialState,
    reducers: {
        setLearingCourse: (state, action: PayloadAction<Course>) => {
            state.learningCourse = action.payload;
        },
        setStepActive: (
            state,
            action: PayloadAction<{ sectionIndex: number; stepIndex: number }>,
        ) => {
            const step =
                state.learningCourse.sections[action.payload.sectionIndex].steps[
                    action.payload.stepIndex
                ];
            state.stepActive = step;
            state.temp.tempActiveSectionIndex = action.payload.sectionIndex;
            state.temp.tempActiveStepIndex = action.payload.stepIndex;
            state.stepActiveType = step.quizId != 1 ? LessionType.QUIZ : LessionType.VIDEO;
            state.isShowAnswer = false;
            state.quizAnswer = [];
        },
        setStepActiveByStepId: (state, action: PayloadAction<number>) => {
            state.learningCourse.sections.forEach((section) => {
                const index = section.steps.findIndex((step) => step.stepId === action.payload);
                if (index >= 0) {
                    state.stepActive = section.steps[index];
                }
            });
        },
        setQuestionAnswer: (state, action: PayloadAction<QuestionData>) => {
            const index = state.quizAnswer.findIndex(
                (q) => q.questionId === action.payload.questionId,
            );
            if (index >= 0) {
                state.quizAnswer[index] = action.payload;
            } else {
                state.quizAnswer.push(action.payload);
            }
        },
        setShowAnswer: (state, action: PayloadAction<boolean>) => {
            state.isShowAnswer = action.payload;
        },
        gotToNextStep: (state) => {
            //state.stepActive =
        },
        tryAnswerAgain: (state) => {
            const step =
                state.learningCourse.sections[state.temp.tempActiveSectionIndex].steps[
                    state.temp.tempActiveStepIndex
                ];
            state.stepActive = step;
            state.stepActiveType = step.quizId != 1 ? LessionType.QUIZ : LessionType.VIDEO;
            state.isShowAnswer = false;
            state.quizAnswer = state.quizAnswer.map((value) => ({
                ...value,
                userSelectedAnswer: -1,
            }));
        },
    },
});

export const {
    setLearingCourse,
    setStepActive,
    setStepActiveByStepId,
    setQuestionAnswer,
    setShowAnswer,
    tryAnswerAgain,
} = learningCourseSlice.actions;

export default learningCourseSlice.reducer;
