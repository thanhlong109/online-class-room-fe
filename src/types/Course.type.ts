export interface Course {
    courseId: number;
    description: string;
    imageUrl: string;
    videoPreviewUrl: string;
    price: number;
    salesCampaign: number;
    title: string;
    isPublic: boolean;
    createAt: string;
    publicAt: string;
    updateAt: any;
    totalDuration: number;
    courseIsActive: boolean;
    knowdledgeDescription: string;
    linkCertificated: any;
    courseCategories: CourseCategory[];
    orders: any[];
    registrationCourses: any[];
    sections: any[];
    wishLists: any[];
    linkCertificateAccounts: any[];
}

export interface Section {
    sectionId: number;
    courseId: number;
    title: string;
    position: number;
    course: any;
    steps: Step[];
}

export interface Step {
    stepId: number;
    sectionId: number;
    duration: number;
    position: number;
    title: string;
    videoUrl: string;
    stepDescription: string;
    quizzes: any[];
    section: any;
}

export interface AddCourseRequest {
    title: string;
    description: string;
    imageUrl: string;
    videoPreviewUrl: string;
    price: number;
    salesCampaign: number;
    isPublic: boolean;
    totalDuration: number;
    courseIsActive: boolean;
    knowdledgeDescription: string;
    linkCertificated: string;
    categoryList: number[];
}

export interface UpdateCourseRequest {
    courseId: number;
    title: string;
    description: string;
    imageUrl: string;
    videoPreviewUrl: string;
    price: number;
    salesCampaign: number;
    isPublic: boolean;
    totalDuration: number;
    courseIsActive: boolean;
    knowdledgeDescription: string;
    linkCertificated: string;
    categoryList: number[];
}

export interface CategoryRespone {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
}

export interface CourseCategory {
    courseCategoryId: number;
    courseId: number;
    categoryId: number;
    category: any;
    course: any;
}
