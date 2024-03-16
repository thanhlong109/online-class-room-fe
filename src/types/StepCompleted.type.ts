export interface GetStepIdByRegistrationIdRespone {
    stepId: number;
}

export interface AddOrUpdateStepCompletedRespone {
    registrationId: number;
    courseId: number;
    accountId: string;
    enrollmentDate: string;
    isCompleted: boolean;
    learningProgress: number;
    account: any;
    course: any;
    ratingCourses: any[];
    stepCompleteds: StepCompleted[];
}

export interface StepCompleted {
    completedStepId: number;
    registrationId: number;
    stepId: number;
    dateCompleted: string;
    registration: any;
    answerHistories: any[];
}
