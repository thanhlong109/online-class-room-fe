import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course, Step } from '../types/Course.type';
import { CheckRegistrationCourseRespone } from '../types/RegistrationCourse.type';

export enum LessionType {
    QUIZ,
    VIDEO,
    DONE,
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
    isDone: boolean;
    registrationData: CheckRegistrationCourseRespone | null;
    lastStepCompeleted: number | null;
    lastPostionCompleted: number;
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
    isDone: false,
    registrationData: null,
    lastPostionCompleted: 1,
    lastStepCompeleted: null,
};

export const learningCourseSlice = createSlice({
    name: 'learningCourse',
    initialState,
    reducers: {
        setLearingCourse: (state, action: PayloadAction<Course>) => {
            state.learningCourse = action.payload;
            state.stepActive = action.payload.sections[0].steps[0];
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
            state.learningCourse.sections.forEach((section, sectionIndex) => {
                const index = section.steps.findIndex((step) => step.stepId === action.payload);
                if (index >= 0) {
                    const step = section.steps[index];
                    state.stepActive = step;
                    state.temp.tempActiveSectionIndex = sectionIndex;
                    state.temp.tempActiveStepIndex = index;
                    state.stepActiveType = step.quizId != 1 ? LessionType.QUIZ : LessionType.VIDEO;
                    state.isShowAnswer = false;
                    state.quizAnswer = [];
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
            const stepIndex = state.temp.tempActiveStepIndex;
            const sectionIndex = state.temp.tempActiveSectionIndex;
            let step;
            if (stepIndex < state.learningCourse.sections[sectionIndex].steps.length - 1) {
                step = state.learningCourse.sections[sectionIndex].steps[stepIndex + 1];
                state.stepActive = step;
                state.temp.tempActiveSectionIndex = sectionIndex;
                state.temp.tempActiveStepIndex = stepIndex + 1;
            } else {
                if (sectionIndex + 1 < state.learningCourse.sections.length) {
                    step = state.learningCourse.sections[sectionIndex + 1].steps[0];
                    state.stepActive = step;
                    state.temp.tempActiveSectionIndex = sectionIndex + 1;
                    state.temp.tempActiveStepIndex = 0;
                } else {
                    state.isDone = true;
                }
            }
            state.stepActiveType =
                step === undefined
                    ? LessionType.DONE
                    : step.quizId != 1
                      ? LessionType.QUIZ
                      : LessionType.VIDEO;
            state.isShowAnswer = false;
            state.quizAnswer = [];
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
        setRegistrationData: (state, action: PayloadAction<CheckRegistrationCourseRespone>) => {
            state.registrationData = action.payload;
        },
        setLastStepCompleted: (state, action: PayloadAction<number>) => {
            state.learningCourse.sections.forEach((section) => {
                const index = section.steps.findIndex((step) => step.stepId === action.payload);
                if (index >= 0) {
                    state.lastStepCompeleted = action.payload;
                    state.lastPostionCompleted = section.steps[index].position;
                }
            });
        },
        setNextStepCompletedPos: (state) => {
            state.lastPostionCompleted = state.lastPostionCompleted + 1;
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
    gotToNextStep,
    setRegistrationData,
    setLastStepCompleted,
    setNextStepCompletedPos,
} = learningCourseSlice.actions;

export default learningCourseSlice.reducer;
