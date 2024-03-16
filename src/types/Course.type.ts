/////////////////////// Course ////////////////////////
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
    sections: Section[];
    wishLists: any[];
    linkCertificateAccounts: any[];
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

export interface GetAllCourse {
    courses: Course[];
    currentPage: number;
    pageSize: number;
    totalCourses: number;
    totalPages: number;
}

export interface CountStudentPerCourse {
    courseId: number;
    courseTitle: string;
    totalStudents: number;
}
/////////////////////// Section ////////////////////////
export interface Section {
    sectionId: number;
    courseId: number;
    title: string;
    position: number;
    course: any;
    steps: Step[];
}

export interface AddSectionReqest {
    courseId: number;
    title: string;
    position: number;
}

export interface UpdateSectionRequest {
    sectionId: number;
    title: string;
    position: number;
}

/////////////////////// Step ////////////////////////
export interface Step {
    stepId: number;
    sectionId: number;
    quizId: number;
    duration: number;
    position: number;
    title: string;
    videoUrl: string;
    stepDescription: string;
    quiz: any;
    section: any;
}

export interface AddStepRequest {
    sectionId: number;
    duration: number;
    position: number;
    title: string;
    videoUrl: string;
    stepDescription: string;
    quizId: number;
}

export interface UpdateStepRequest {
    stepId: number;
    duration: number;
    position: number;
    title: string;
    videoUrl: string;
    stepDescription: string;
    quizId: number;
}

/////////////////////// Category ////////////////////////
export interface CategoryRespone {
    catgoryId: number;
    name: string;
    description: string;
    courseCategories?: any[];
}

export interface CourseCategory {
    courseCategoryId: number;
    courseId: number;
    categoryId: number;
    category?: any;
    course?: any;
}

export interface AddCategoryRequest {
    categoryName: string;
    categoryDescription: string;
}

export interface UpdateCategoryRequest {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
}
