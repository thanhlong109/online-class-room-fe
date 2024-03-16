export interface CheckRegistrationCourseRequest {
    accountId: string;
    courseId: number;
}
export interface CheckRegistrationCourseRespone {
    registrationId: number;
    courseId: number;
    accountId: string;
    enrollmentDate: string;
    isCompleted: boolean;
    learningProgress: number;
}

export interface RegistrationCourse {
    registrationId: number;
    courseId: number;
    accountId: string;
    enrollmentDate: string;
    isCompleted: boolean;
    learningProgress: number;
    courseTitle: string;
    courseDescription: string;
    courseImg: string;
}
