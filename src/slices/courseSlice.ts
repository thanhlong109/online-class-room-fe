import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AddCourseRequest, Course, Section, SectionReqest, Step } from '../types/Course.type';
import { StepProps } from 'antd';

interface courseState {
    wishList: number[];
    addCourse: {
        data: AddCourseRequest;
        currentStep: number;
        navStatus: StepProps[];
        courseCreatedData: Course;
    };
    addSection: SectionReqest[];
}

const initialState: courseState = {
    wishList: [],
    addCourse: {
        data: {
            categoryList: [],
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
        },
        currentStep: 0,
        navStatus: [
            { title: 'Hiển thị', status: 'process' },
            { title: 'Chu trình học', status: 'wait' },
            { title: 'Xuất bản khóa học', status: 'wait' },
        ],
        courseCreatedData: {
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
        },
    },
    addSection: [],
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        addWishList: (state, action: PayloadAction<number>) => {
            state.wishList = [...state.wishList, action.payload];
        },
        removeWishlist: (state, action: PayloadAction<number>) => {
            const courseIndex = state.wishList.findIndex((courseId) => courseId === action.payload);
            if (courseIndex != -1) {
                state.wishList.splice(courseIndex, 1);
            }
        },
        setWishList: (state, action: PayloadAction<number[]>) => {
            state.wishList = action.payload;
        },
        setAddCourse: (
            state,
            action: PayloadAction<{
                data: AddCourseRequest;
                currentStep: number;
            }>,
        ) => {
            state.addCourse = {
                ...action.payload,
                navStatus: state.addCourse.navStatus,
                courseCreatedData: state.addCourse.courseCreatedData,
            };
        },
        setCourseContentCurrent: (state, action: PayloadAction<number>) => {
            state.addCourse.navStatus.forEach((value) => {
                value.status === 'process' ? (value.status = 'wait') : value.status;
            });
            state.addCourse.navStatus[action.payload].status = 'process';
        },
        setCourseContentDone: (state, action: PayloadAction<number>) => {
            state.addCourse.navStatus[action.payload].status = 'finish';
        },
        setCourseCreatedData: (state, action: PayloadAction<Course>) => {
            state.addCourse.courseCreatedData = action.payload;
        },
        addCourseSection: (state, action: PayloadAction<Section>) => {
            state.addCourse.courseCreatedData.sections.push(action.payload);
        },
        updateSectionId: (state, action: PayloadAction<{ title: string; sectionId: number }>) => {
            const index = state.addCourse.courseCreatedData.sections.findIndex(
                (value) => value.sectionId === action.payload.sectionId,
            );
            if (index >= 0) {
                state.addCourse.courseCreatedData.sections[index] = {
                    ...state.addCourse.courseCreatedData.sections[index],
                    title: action.payload.title,
                };
            }
        },
        addCourseStep: (state, action: PayloadAction<Step>) => {
            const index = state.addCourse.courseCreatedData.sections.findIndex(
                (value) => value.sectionId === action.payload.sectionId,
            );
            if (index >= 0) {
                state.addCourse.courseCreatedData.sections[index].steps.push(action.payload);
            }
        },
        setStep: (state, action: PayloadAction<Step>) => {
            const index = state.addCourse.courseCreatedData.sections.findIndex(
                (value) => value.sectionId === action.payload.sectionId,
            );
            if (index >= 0) {
                const stepIndex = state.addCourse.courseCreatedData.sections[index].steps.findIndex(
                    (value) => value.stepId === action.payload.stepId,
                );
                if (stepIndex >= 0) {
                    state.addCourse.courseCreatedData.sections[index].steps[stepIndex] =
                        action.payload;
                }
            }
        },
        updateStepTitle: (
            state,
            action: PayloadAction<{ sectionId: number; stepId: number; title: string }>,
        ) => {
            const index = state.addCourse.courseCreatedData.sections.findIndex(
                (value) => value.sectionId === action.payload.sectionId,
            );
            if (index >= 0) {
                const stepIndex = state.addCourse.courseCreatedData.sections[index].steps.findIndex(
                    (value) => value.stepId === action.payload.stepId,
                );
                if (stepIndex >= 0) {
                    state.addCourse.courseCreatedData.sections[index].steps[stepIndex].title =
                        action.payload.title;
                }
            }
        },
        updateCourseImageUrl: (state, action: PayloadAction<string>) => {
            state.addCourse.courseCreatedData.imageUrl = action.payload;
        },
        updateCoursePreviewUrl: (state, action: PayloadAction<string>) => {
            state.addCourse.courseCreatedData.videoPreviewUrl = action.payload;
        },
        updateStepDescription: (
            state,
            action: PayloadAction<{ sectionId: number; stepId: number; description: string }>,
        ) => {
            const index = state.addCourse.courseCreatedData.sections.findIndex(
                (value) => value.sectionId === action.payload.sectionId,
            );
            if (index >= 0) {
                const stepIndex = state.addCourse.courseCreatedData.sections[index].steps.findIndex(
                    (value) => value.stepId === action.payload.stepId,
                );
                if (stepIndex >= 0) {
                    state.addCourse.courseCreatedData.sections[index].steps[
                        stepIndex
                    ].stepDescription = action.payload.description;
                }
            }
        },
    },
});

export const selectCourse = (state: RootState) => state.course;

export const {
    addWishList,
    removeWishlist,
    setWishList,
    setAddCourse,
    setCourseContentCurrent,
    setCourseContentDone,
    setCourseCreatedData,
    addCourseSection,
    updateSectionId,
    addCourseStep,
    setStep,
    updateStepTitle,
    updateCourseImageUrl,
    updateCoursePreviewUrl,
    updateStepDescription,
} = courseSlice.actions;

export default courseSlice.reducer;
