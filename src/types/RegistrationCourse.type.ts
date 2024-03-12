export interface CheckRegistrationCourseRequest {
    accountId: string;
    courseId: number;
}
export interface CheckRegistrationCourseRespone {
    isRegistered: boolean;
}

export interface GetRegistrationCoursesRespone {
    registrationId: number;
    courseId: number;
    accountId: string;
    enrollmentDate: string;
    isCompleted: boolean;
    learningProgress: number;
    courseTitle: string;
    courseDescription: string;
}
